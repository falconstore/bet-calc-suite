import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FreebetEntry {
  odd: string;
  commission: string;
  isLay: boolean;
}

export const CalculatorFreeProDirect = () => {
  const [mode, setMode] = useState<'freebet' | 'cashback'>('freebet');
  const [numEntries, setNumEntries] = useState(3);
  const [rounding, setRounding] = useState(1.00);
  
  // Freebet fields
  const [houseOdd, setHouseOdd] = useState("");
  const [houseCommission, setHouseCommission] = useState("");
  const [qualifyingStake, setQualifyingStake] = useState("");
  const [freebetValue, setFreebetValue] = useState("");
  const [extractionRate, setExtractionRate] = useState("70");
  
  // Cashback fields
  const [cashbackOdd, setCashbackOdd] = useState("");
  const [cashbackCommission, setCashbackCommission] = useState("");
  const [cashbackStake, setCashbackStake] = useState("");
  const [cashbackRate, setCashbackRate] = useState("");
  
  // Coverage entries
  const [entries, setEntries] = useState<FreebetEntry[]>(
    Array(5).fill(null).map(() => ({ odd: "", commission: "", isLay: false }))
  );
  
  // Results
  const [totalStake, setTotalStake] = useState(0);
  const [roi, setRoi] = useState(0);
  const [results, setResults] = useState<any[]>([]);

  const parseFlex = (val: string): number => {
    if (!val) return 0;
    const cleaned = val.replace(/[^\d.,-]/g, '').replace(',', '.');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  const formatBRL = (val: number): string => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const calculateFreebet = () => {
    const o1 = parseFlex(houseOdd);
    const c1 = parseFlex(houseCommission);
    const s1 = parseFlex(qualifyingStake);
    const F = parseFlex(freebetValue);
    const r = parseFlex(extractionRate);

    if (o1 <= 0 || F <= 0) {
      setResults([]);
      setTotalStake(0);
      setRoi(0);
      return;
    }

    const activeEntries = entries.slice(0, numEntries - 1);
    const validEntries = activeEntries.filter(e => parseFlex(e.odd) > 0);
    
    if (validEntries.length === 0) {
      setResults([]);
      setTotalStake(0);
      setRoi(0);
      return;
    }

    // Cálculo simplificado de Freebet
    const effOdd1 = o1 * (1 - c1 / 100);
    const target = F * (r / 100);
    
    let total = s1;
    const profits: number[] = [0];
    const stakes: number[] = [s1];

    validEntries.forEach((entry, idx) => {
      const odd = parseFlex(entry.odd);
      const comm = parseFlex(entry.commission);
      const effOdd = odd * (1 - comm / 100);
      
      let stake = 0;
      if (entry.isLay) {
        stake = target / (odd - comm / 100);
      } else {
        stake = target / effOdd;
      }
      
      stake = Math.ceil(stake / rounding) * rounding;
      stakes.push(stake);
      total += stake;
    });

    // Calcular lucros
    validEntries.forEach((entry, idx) => {
      const stake = stakes[idx + 1];
      const odd = parseFlex(entry.odd);
      const comm = parseFlex(entry.commission);
      
      if (entry.isLay) {
        const resp = stake * (odd - 1);
        profits.push(stake * (1 - comm / 100) - resp);
      } else {
        const effOdd = odd * (1 - comm / 100);
        profits.push(stake * effOdd - total);
      }
    });

    const minProfit = Math.min(...profits);
    const roiCalc = total > 0 ? (minProfit / total) * 100 : 0;

    setTotalStake(total);
    setRoi(roiCalc);
    
    const resultsData = [
      {
        name: "Qualificação",
        odd: o1.toFixed(2),
        commission: c1.toFixed(2),
        stake: formatBRL(s1),
        profit: formatBRL(profits[0])
      },
      ...validEntries.map((entry, idx) => ({
        name: `Resultado ${idx + 2}`,
        odd: parseFlex(entry.odd).toFixed(2),
        commission: parseFlex(entry.commission).toFixed(2),
        stake: formatBRL(stakes[idx + 1]),
        profit: formatBRL(profits[idx + 1])
      }))
    ];
    
    setResults(resultsData);
  };

  const calculateCashback = () => {
    const o1 = parseFlex(cashbackOdd);
    const c1 = parseFlex(cashbackCommission);
    const s1 = parseFlex(cashbackStake);
    const cbRate = parseFlex(cashbackRate);

    if (o1 <= 0 || s1 <= 0 || cbRate <= 0) {
      setResults([]);
      setTotalStake(0);
      setRoi(0);
      return;
    }

    const activeEntries = entries.slice(0, numEntries - 1);
    const validEntries = activeEntries.filter(e => parseFlex(e.odd) > 0);
    
    if (validEntries.length === 0) {
      setResults([]);
      setTotalStake(0);
      setRoi(0);
      return;
    }

    // Cálculo de Cashback
    const cashbackAmount = s1 * (cbRate / 100);
    const effOdd1 = o1 * (1 - c1 / 100);
    
    let total = s1;
    const profits: number[] = [];
    const stakes: number[] = [s1];

    // Lucro se ganhar a aposta principal
    profits.push((s1 * effOdd1) - total);

    validEntries.forEach((entry, idx) => {
      const odd = parseFlex(entry.odd);
      const comm = parseFlex(entry.commission);
      const effOdd = odd * (1 - comm / 100);
      
      let stake = 0;
      if (entry.isLay) {
        stake = (s1 * effOdd1) / (odd - comm / 100);
      } else {
        stake = (s1 * effOdd1) / effOdd;
      }
      
      stake = Math.ceil(stake / rounding) * rounding;
      stakes.push(stake);
      total += stake;
    });

    // Recalcular lucros considerando cashback
    profits[0] = (s1 * effOdd1) - total;
    
    validEntries.forEach((entry, idx) => {
      const stake = stakes[idx + 1];
      const odd = parseFlex(entry.odd);
      const comm = parseFlex(entry.commission);
      
      if (entry.isLay) {
        const resp = stake * (odd - 1);
        // Se perder a aposta principal, ganha cashback
        profits.push(stake * (1 - comm / 100) - resp + cashbackAmount);
      } else {
        const effOdd = odd * (1 - comm / 100);
        // Se perder a aposta principal, ganha cashback
        profits.push(stake * effOdd - total + cashbackAmount);
      }
    });

    const minProfit = Math.min(...profits);
    const roiCalc = total > 0 ? (minProfit / total) * 100 : 0;

    setTotalStake(total);
    setRoi(roiCalc);
    
    const resultsData = [
      {
        name: "Qualificação",
        odd: o1.toFixed(2),
        commission: c1.toFixed(2),
        stake: formatBRL(s1),
        profit: formatBRL(profits[0])
      },
      ...validEntries.map((entry, idx) => ({
        name: `Resultado ${idx + 2}`,
        odd: parseFlex(entry.odd).toFixed(2),
        commission: parseFlex(entry.commission).toFixed(2),
        stake: formatBRL(stakes[idx + 1]),
        profit: formatBRL(profits[idx + 1])
      }))
    ];
    
    setResults(resultsData);
  };

  useEffect(() => {
    if (mode === 'freebet') {
      calculateFreebet();
    } else {
      calculateCashback();
    }
  }, [houseOdd, houseCommission, qualifyingStake, freebetValue, extractionRate, 
      cashbackOdd, cashbackCommission, cashbackStake, cashbackRate,
      entries, numEntries, rounding, mode]);

  const updateEntry = (index: number, field: keyof FreebetEntry, value: any) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  // Serializar estado para URL
  const serializeState = () => {
    const state: any = {
      mode,
      numEntries,
      rounding
    };

    if (mode === 'freebet') {
      if (houseOdd) state.ho = houseOdd;
      if (houseCommission) state.hc = houseCommission;
      if (qualifyingStake) state.qs = qualifyingStake;
      if (freebetValue) state.fv = freebetValue;
      if (extractionRate) state.er = extractionRate;
    } else {
      if (cashbackOdd) state.co = cashbackOdd;
      if (cashbackCommission) state.cc = cashbackCommission;
      if (cashbackStake) state.cs = cashbackStake;
      if (cashbackRate) state.cr = cashbackRate;
    }

    // Adicionar entries com valores preenchidos
    const validEntries = entries.slice(0, numEntries - 1).filter(e => e.odd || e.commission);
    if (validEntries.length > 0) {
      state.entries = validEntries.map(e => ({
        o: e.odd || '',
        c: e.commission || '',
        l: e.isLay ? 1 : 0
      }));
    }

    return state;
  };

  // Deserializar URL para estado
  const deserializeState = (params: URLSearchParams) => {
    const mode = params.get('mode') as 'freebet' | 'cashback' || 'freebet';
    setMode(mode);

    const numEntries = parseInt(params.get('numEntries') || '3');
    setNumEntries(numEntries);

    const rounding = parseFloat(params.get('rounding') || '1.00');
    setRounding(rounding);

    if (mode === 'freebet') {
      if (params.has('ho')) setHouseOdd(params.get('ho')!);
      if (params.has('hc')) setHouseCommission(params.get('hc')!);
      if (params.has('qs')) setQualifyingStake(params.get('qs')!);
      if (params.has('fv')) setFreebetValue(params.get('fv')!);
      if (params.has('er')) setExtractionRate(params.get('er')!);
    } else {
      if (params.has('co')) setCashbackOdd(params.get('co')!);
      if (params.has('cc')) setCashbackCommission(params.get('cc')!);
      if (params.has('cs')) setCashbackStake(params.get('cs')!);
      if (params.has('cr')) setCashbackRate(params.get('cr')!);
    }

    // Restaurar entries
    const entriesStr = params.get('entries');
    if (entriesStr) {
      try {
        const entriesData = JSON.parse(entriesStr);
        const newEntries = [...entries];
        entriesData.forEach((e: any, idx: number) => {
          if (idx < newEntries.length) {
            newEntries[idx] = {
              odd: e.o || '',
              commission: e.c || '',
              isLay: e.l === 1
            };
          }
        });
        setEntries(newEntries);
      } catch (error) {
        console.error('Erro ao restaurar entries:', error);
      }
    }
  };

  // Compartilhar calculadora
  const handleShare = async () => {
    const state = serializeState();
    const params = new URLSearchParams();
    
    Object.entries(state).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'entries') {
          params.set(key, JSON.stringify(value));
        } else {
          params.set(key, String(value));
        }
      }
    });

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}#calculadoras`;
    
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copiado!",
        description: "O link da calculadora foi copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Link gerado",
        description: "Copie o link da barra de endereços do navegador.",
        variant: "destructive",
      });
      window.history.pushState({}, '', url);
    }
  };

  // Carregar estado da URL ao montar
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('mode') || params.has('ho') || params.has('co')) {
      deserializeState(params);
    }
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="calc-header mb-8">
        <h1 className="text-3xl md:text-4xl font-black mb-4">
          <span className="text-gradient">Calculadora FreePro</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Otimize seus lucros com freebets e cashbacks
        </p>
      </div>

      {/* Configurações */}
      <div className="stats-grid mb-8">
        <div className="stat-card">
          <div className="stat-label">Modo de Cálculo</div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setMode('freebet')}
              className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                mode === 'freebet'
                  ? 'bg-gradient-to-r from-[hsl(var(--shark-gradient-start))] to-[hsl(var(--shark-gradient-end))] text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Freebet
            </button>
            <button
              onClick={() => setMode('cashback')}
              className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                mode === 'cashback'
                  ? 'bg-gradient-to-r from-[hsl(var(--shark-gradient-start))] to-[hsl(var(--shark-gradient-end))] text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Cashback
            </button>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Número de Entradas</div>
          <select
            value={numEntries}
            onChange={(e) => setNumEntries(parseInt(e.target.value))}
            className="form-select mt-3 w-full"
          >
            <option value="2">2 Mercados</option>
            <option value="3">3 Mercados</option>
            <option value="4">4 Mercados</option>
            <option value="5">5 Mercados</option>
            <option value="6">6 Mercados</option>
          </select>
        </div>

        <div className="stat-card">
          <div className="stat-label">Arredondamento</div>
          <select
            value={rounding}
            onChange={(e) => setRounding(parseFloat(e.target.value))}
            className="form-select mt-3 w-full"
          >
            <option value="0.01">R$ 0,01</option>
            <option value="0.10">R$ 0,10</option>
            <option value="0.50">R$ 0,50</option>
            <option value="1.00">R$ 1,00</option>
          </select>
        </div>

        <div className="stat-card">
          <div className="stat-value">{formatBRL(totalStake)}</div>
          <div className="stat-label">Stake Total</div>
        </div>

        <div className="stat-card">
          <div className={`stat-value ${roi >= 0 ? 'profit-highlight' : 'profit-negative'}`}>
            {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
          </div>
          <div className="stat-label">ROI</div>
        </div>
      </div>

      {/* Casa Promoção */}
      {mode === 'freebet' && (
        <div className="card mb-6">
          <div className="section-title">Casa Promoção (Freebet)</div>
          
          <div className="grid-2 mb-4">
            <div className="form-group">
              <label className="form-label">Odd da Casa</label>
              <input
                type="text"
                value={houseOdd}
                onChange={(e) => setHouseOdd(e.target.value)}
                placeholder="ex: 3.00"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Comissão (%)</label>
              <input
                type="text"
                value={houseCommission}
                onChange={(e) => setHouseCommission(e.target.value)}
                placeholder="ex: 0"
                className="form-input"
              />
            </div>
          </div>

          <div className="grid-2 mb-4">
            <div className="form-group">
              <label className="form-label">Stake Qualificação</label>
              <input
                type="text"
                value={qualifyingStake}
                onChange={(e) => setQualifyingStake(e.target.value)}
                placeholder="ex: 50"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Valor da Freebet</label>
              <input
                type="text"
                value={freebetValue}
                onChange={(e) => setFreebetValue(e.target.value)}
                placeholder="ex: 50"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Taxa de Extração (%)</label>
            <input
              type="text"
              value={extractionRate}
              onChange={(e) => setExtractionRate(e.target.value)}
              placeholder="ex: 70"
              className="form-input"
            />
          </div>
        </div>
      )}

      {/* Casa Promoção - Cashback */}
      {mode === 'cashback' && (
        <div className="card mb-6">
          <div className="section-title">Casa Promoção (Cashback)</div>
          
          <div className="grid-2 mb-4">
            <div className="form-group">
              <label className="form-label">Odd da Casa</label>
              <input
                type="text"
                value={cashbackOdd}
                onChange={(e) => setCashbackOdd(e.target.value)}
                placeholder="ex: 3.00"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Comissão (%)</label>
              <input
                type="text"
                value={cashbackCommission}
                onChange={(e) => setCashbackCommission(e.target.value)}
                placeholder="ex: 0"
                className="form-input"
              />
            </div>
          </div>

          <div className="grid-2 mb-4">
            <div className="form-group">
              <label className="form-label">Stake Qualificação</label>
              <input
                type="text"
                value={cashbackStake}
                onChange={(e) => setCashbackStake(e.target.value)}
                placeholder="ex: 100"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Taxa de Cashback (%)</label>
              <input
                type="text"
                value={cashbackRate}
                onChange={(e) => setCashbackRate(e.target.value)}
                placeholder="ex: 10"
                className="form-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* Coberturas */}
      <div className="card mb-6">
        <div className="section-title">Coberturas</div>
        <div className="house-grid">
          {entries.slice(0, numEntries - 1).map((entry, idx) => (
            <div key={idx} className="house-card">
              <h3 className="house-title">Resultado {idx + 2}</h3>
              
              <div className="grid-2 mb-4">
                <div className="form-group">
                  <label className="form-label">Odd</label>
                  <input
                    type="text"
                    value={entry.odd}
                    onChange={(e) => updateEntry(idx, 'odd', e.target.value)}
                    placeholder="ex: 2.50"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Comissão (%)</label>
                  <input
                    type="text"
                    value={entry.commission}
                    onChange={(e) => updateEntry(idx, 'commission', e.target.value)}
                    placeholder="ex: 0"
                    className="form-input"
                  />
                </div>
              </div>

              <label className="checkbox-group">
                <input
                  type="checkbox"
                  checked={entry.isLay}
                  onChange={(e) => updateEntry(idx, 'isLay', e.target.checked)}
                />
                <span>Lay (Contra)</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Botão Compartilhar */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleShare}
          className="btn btn-primary flex items-center gap-2"
          style={{ minWidth: '200px' }}
        >
          <Share2 className="w-4 h-4" />
          Compartilhar Calculadora
        </button>
      </div>

      {/* Resultados */}
      {results.length > 0 && (
        <div className="card">
          <div className="section-title">Resultados Shark FreePro</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Mercado</th>
                  <th>Odd</th>
                  <th>Comissão</th>
                  <th>Stake</th>
                  <th>Lucro</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, idx) => (
                  <tr key={idx}>
                    <td><strong>{result.name}</strong></td>
                    <td>{result.odd}</td>
                    <td>{result.commission}%</td>
                    <td>{result.stake}</td>
                    <td className={parseFlex(result.profit) >= 0 ? 'profit-positive' : 'profit-negative'}>
                      {result.profit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
