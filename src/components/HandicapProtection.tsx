import { useState } from "react";
import { Target, Info, TrendingUp, Globe } from "lucide-react";

interface Scenario {
  description: string;
  result: string;
  resultClass: 'win' | 'lose' | 'draw';
  betOrProtection: 'Aposta' | 'Proteção' | 'Ambas';
}

type HandicapType = 'asiatico' | 'europeu';

export const HandicapProtection = () => {
  const [betType, setBetType] = useState("");
  const [customGoals, setCustomGoals] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [handicap, setHandicap] = useState(0);
  const [goalDiff, setGoalDiff] = useState(0);
  const [handicapType, setHandicapType] = useState<HandicapType>('asiatico');

  const betMap: Record<string, number> = {
    'win1': 1,
    'win2': 2,
    'win3': 3,
    'win4': 4,
    'win5': 5
  };

  const handleBetTypeChange = (value: string) => {
    setBetType(value);
    if (value === 'custom') {
      setShowResult(false);
    } else if (value !== '') {
      calculateHandicap(value);
    } else {
      setShowResult(false);
    }
  };

  const handleCustomGoalsChange = (value: string) => {
    setCustomGoals(value);
    const numValue = parseInt(value);
    if (numValue && numValue > 0) {
      calculateHandicap('custom', numValue);
    }
  };

  const calculateHandicap = (type: string, customValue?: number) => {
    let diff: number;
    
    if (type === 'custom' && customValue) {
      diff = customValue;
    } else {
      diff = betMap[type];
    }
    
    if (!diff) return;
    
    // Asiático: diff - 0.5, Europeu: diff - 1
    const calculatedHandicap = handicapType === 'asiatico' ? diff - 0.5 : diff - 1;
    setHandicap(calculatedHandicap);
    setGoalDiff(diff);
    setShowResult(true);
  };

  const selectBet = (type: string) => {
    setBetType(type);
    calculateHandicap(type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateScenarios = (): Scenario[] => {
    const scenarios: Scenario[] = [];
    
    if (handicapType === 'asiatico') {
      // Cenários para Handicap Asiático
      if (goalDiff === 1) {
        scenarios.push({
          description: 'Vence por 1+ gol (ex: 1x0, 2x1, 3x0)',
          result: '✓ GANHA',
          resultClass: 'win',
          betOrProtection: 'Ambas'
        });
      } else {
        scenarios.push({
          description: `Vence por ${goalDiff}+ gols (ex: ${goalDiff}x0, ${goalDiff+1}x1)`,
          result: '✓ GANHA',
          resultClass: 'win',
          betOrProtection: 'Ambas'
        });
      }
      
      if (goalDiff > 1) {
        const examples: string[] = [];
        for (let i = 1; i < goalDiff; i++) {
          examples.push(`${i}x0`);
          if (i > 1) examples.push(`${i}x${i-1}`);
        }
        scenarios.push({
          description: `Vence por menos de ${goalDiff} gols (ex: ${examples.slice(0, 2).join(', ')})`,
          result: '✗ PERDE',
          resultClass: 'lose',
          betOrProtection: 'Proteção'
        });
      }
      
      scenarios.push({
        description: 'Empate (ex: 0x0, 1x1, 2x2)',
        result: '✗ PERDE',
        resultClass: 'lose',
        betOrProtection: 'Proteção'
      });
      
      scenarios.push({
        description: 'Time perde (ex: 0x1, 1x2)',
        result: '✗ PERDE',
        resultClass: 'lose',
        betOrProtection: 'Proteção'
      });
    } else {
      // Cenários para Handicap Europeu
      scenarios.push({
        description: `Vence por ${goalDiff+1}+ gols (ex: ${goalDiff+1}x0, ${goalDiff+2}x1)`,
        result: '✓ GANHA',
        resultClass: 'win',
        betOrProtection: 'Ambas'
      });
      
      scenarios.push({
        description: `Vence por exatos ${goalDiff} gols (ex: ${goalDiff}x0, ${goalDiff+1}x1)`,
        result: '⚖ EMPATE (Devolvida)',
        resultClass: 'draw',
        betOrProtection: 'Proteção'
      });
      
      if (goalDiff > 1) {
        const examples: string[] = [];
        for (let i = 1; i < goalDiff; i++) {
          examples.push(`${i}x0`);
        }
        scenarios.push({
          description: `Vence por menos de ${goalDiff} gols (ex: ${examples.slice(0, 2).join(', ')})`,
          result: '✗ PERDE',
          resultClass: 'lose',
          betOrProtection: 'Proteção'
        });
      } else {
        scenarios.push({
          description: 'Empate (ex: 0x0, 1x1)',
          result: '✗ PERDE',
          resultClass: 'lose',
          betOrProtection: 'Proteção'
        });
      }
      
      scenarios.push({
        description: 'Time perde (ex: 0x1, 1x2)',
        result: '✗ PERDE',
        resultClass: 'lose',
        betOrProtection: 'Proteção'
      });
    }
    
    return scenarios;
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black mb-3">
          <span className="text-gradient">Proteção de Handicap</span>
        </h2>
        <p className="text-lg text-muted-foreground font-semibold">
          Descubra qual handicap usar para proteger sua aposta de vitória por X gols
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Info Box */}
        <div className="bg-info/10 border-l-4 border-info rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm text-foreground">
              <strong>Como funciona:</strong> Quando você aposta em "Time ganhar por 2 ou mais gols", pode proteger essa aposta usando o Handicap Asiático correspondente. Esta ferramenta mostra exatamente qual handicap usar!
            </div>
          </div>
        </div>

        {/* Handicap Type Selector */}
        <div className="bg-card border border-border/50 rounded-lg p-6">
          <div className="space-y-3">
            <label className="block font-bold text-foreground mb-3">
              Tipo de Handicap:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setHandicapType('asiatico');
                  if (showResult && goalDiff) {
                    const calculatedHandicap = goalDiff - 0.5;
                    setHandicap(calculatedHandicap);
                  }
                }}
                className={`px-6 py-4 rounded-lg border-2 font-bold transition-all ${
                  handicapType === 'asiatico'
                    ? 'bg-gradient-to-r from-[hsl(var(--shark-gradient-start))] to-[hsl(var(--shark-gradient-end))] text-white border-transparent'
                    : 'bg-background text-foreground border-border hover:border-primary'
                }`}
              >
                <Target className="w-5 h-5 mx-auto mb-2" />
                Handicap Asiático
              </button>
              <button
                onClick={() => {
                  setHandicapType('europeu');
                  if (showResult && goalDiff) {
                    const calculatedHandicap = goalDiff - 1;
                    setHandicap(calculatedHandicap);
                  }
                }}
                className={`px-6 py-4 rounded-lg border-2 font-bold transition-all ${
                  handicapType === 'europeu'
                    ? 'bg-gradient-to-r from-[hsl(var(--shark-gradient-start))] to-[hsl(var(--shark-gradient-end))] text-white border-transparent'
                    : 'bg-background text-foreground border-border hover:border-primary'
                }`}
              >
                <Globe className="w-5 h-5 mx-auto mb-2" />
                Handicap Europeu
              </button>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-card border border-border/50 rounded-lg p-6 space-y-5">
          <div className="space-y-3">
            <label className="block font-bold text-foreground">
              Tipo de Aposta:
            </label>
            <select
              value={betType}
              onChange={(e) => handleBetTypeChange(e.target.value)}
              className="w-full px-4 py-3 text-base border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              <option value="">-- Selecione o tipo de aposta --</option>
              <option value="win1">Time ganhar por 1 gol ou mais</option>
              <option value="win2">Time ganhar por 2 gols ou mais</option>
              <option value="win3">Time ganhar por 3 gols ou mais</option>
              <option value="win4">Time ganhar por 4 gols ou mais</option>
              <option value="win5">Time ganhar por 5 gols ou mais</option>
              <option value="custom">Personalizado (digite a diferença)</option>
            </select>
          </div>

          {betType === 'custom' && (
            <div className="space-y-3">
              <label className="block font-bold text-foreground">
                Diferença de gols mínima:
              </label>
              <input
                type="number"
                value={customGoals}
                onChange={(e) => handleCustomGoalsChange(e.target.value)}
                min="1"
                max="10"
                placeholder="Ex: 2"
                className="w-full px-4 py-3 text-base border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          )}
        </div>

        {/* Result Section */}
        {showResult && (
          <div className="bg-card border-2 border-success rounded-lg p-6 space-y-5 animate-fade-in">
            <div className="text-center">
              <div className="text-xl font-bold text-success mb-4 flex items-center justify-center gap-2">
                <Target className="w-6 h-6" />
                HANDICAP RECOMENDADO
              </div>
              
              <div className="bg-background border-2 border-success rounded-lg p-6 mb-5">
                <div className="text-5xl font-black text-success mb-2">
                  -{handicapType === 'asiatico' ? handicap.toFixed(1) : handicap.toFixed(0)}
                </div>
                <div className="text-lg text-muted-foreground">
                  Handicap {handicapType === 'asiatico' ? 'Asiático' : 'Europeu'} -{handicapType === 'asiatico' ? handicap.toFixed(1) : handicap.toFixed(0)}
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-warning/10 border-l-4 border-warning rounded-lg p-4 text-left">
                <div className="font-bold text-foreground mb-2">
                  📋 Por que este handicap?
                </div>
                <div className="text-sm text-foreground leading-relaxed">
                  {handicapType === 'asiatico' ? (
                    <>
                      Para proteger uma aposta de "<strong>ganhar por {goalDiff} ou mais gols</strong>", você deve usar o <strong>Handicap Asiático -{handicap.toFixed(1)}</strong>.<br/><br/>
                      <strong>Como funciona:</strong> O time precisa vencer com {goalDiff}+ gols de diferença para você ganhar a aposta. Se ganhar com menos gols ou empatar/perder, você perde a aposta.
                    </>
                  ) : (
                    <>
                      Para proteger uma aposta de "<strong>ganhar por {goalDiff} ou mais gols</strong>", você deve usar o <strong>Handicap Europeu -{handicap.toFixed(0)}</strong>.<br/><br/>
                      <strong>Como funciona:</strong> O time precisa vencer com {goalDiff+1}+ gols de diferença para você ganhar. Se vencer com exatos {goalDiff} gols, sua aposta é devolvida (empate). Se ganhar com menos gols ou empatar/perder, você perde.
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Scenarios */}
            <div className="bg-background rounded-lg p-5 space-y-3">
              <div className="font-bold text-foreground mb-3">
                📊 Cenários possíveis:
              </div>
              <div className="space-y-2">
                {generateScenarios().map((scenario, idx) => (
                  <div 
                    key={idx}
                    className="grid grid-cols-[1fr_auto_auto] gap-3 items-center py-2.5 border-b border-border last:border-b-0"
                  >
                    <span className="text-sm text-foreground/90">{scenario.description}</span>
                    <span className={`font-semibold text-xs px-2 py-1 rounded whitespace-nowrap ${
                      scenario.betOrProtection === 'Ambas' 
                        ? 'text-primary bg-primary/10 border border-primary/20' 
                        : scenario.betOrProtection === 'Aposta'
                        ? 'text-success bg-success/10 border border-success/20'
                        : 'text-info bg-info/10 border border-info/20'
                    }`}>
                      {scenario.betOrProtection}
                    </span>
                    <span className={`font-semibold text-sm px-3 py-1 rounded whitespace-nowrap ${
                      scenario.resultClass === 'win' 
                        ? 'text-success bg-success/10' 
                        : scenario.resultClass === 'draw'
                        ? 'text-info bg-info/10'
                        : 'text-destructive bg-destructive/10'
                    }`}>
                      {scenario.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Common Bets Cards */}
        <div className="bg-card border border-border/50 rounded-lg p-6">
          <div className="text-center mb-5">
            <div className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              APOSTAS MAIS COMUNS
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { type: 'win1', title: 'Ganhar por 1+ gol', handicap: '0.5' },
              { type: 'win2', title: 'Ganhar por 2+ gols', handicap: '1.5' },
              { type: 'win3', title: 'Ganhar por 3+ gols', handicap: '2.5' },
              { type: 'win4', title: 'Ganhar por 4+ gols', handicap: '3.5' }
            ].map((bet) => (
              <div
                key={bet.type}
                onClick={() => selectBet(bet.type)}
                className="bg-background border-2 border-border rounded-lg p-4 cursor-pointer transition-all hover:border-primary hover:-translate-y-1 hover:shadow-md"
              >
                <div className="font-bold text-foreground mb-1 text-sm">
                  {bet.title}
                </div>
                <div className="text-success text-lg font-bold">
                  → Handicap -{bet.handicap}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
