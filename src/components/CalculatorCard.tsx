import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Share2, Trash2, Plus, Minus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BettingHouse {
  id: number;
  odd: string;
  stake: string;
  commission: boolean;
  freebet: boolean;
  oddIncrease: boolean;
}

export const CalculatorCard = () => {
  const [numHouses, setNumHouses] = useState(2);
  const [investment, setInvestment] = useState("100");
  const [houses, setHouses] = useState<BettingHouse[]>([
    { id: 1, odd: "", stake: "", commission: false, freebet: false, oddIncrease: false },
    { id: 2, odd: "", stake: "", commission: false, freebet: false, oddIncrease: false },
  ]);

  const addHouse = () => {
    if (numHouses < 6) {
      setNumHouses(numHouses + 1);
      setHouses([
        ...houses,
        { id: numHouses + 1, odd: "", stake: "", commission: false, freebet: false, oddIncrease: false },
      ]);
    }
  };

  const removeHouse = () => {
    if (numHouses > 2) {
      setNumHouses(numHouses - 1);
      setHouses(houses.slice(0, -1));
    }
  };

  const calculateROI = () => {
    // Simplified calculation for demo
    const odds = houses.map(h => parseFloat(h.odd) || 0);
    if (odds.some(o => o === 0)) return "0.00";
    
    const invertedSum = odds.reduce((sum, odd) => sum + (1 / odd), 0);
    const roi = ((1 / invertedSum) - 1) * 100;
    return roi.toFixed(2);
  };

  const handleShare = () => {
    const config = btoa(JSON.stringify({ houses, investment }));
    navigator.clipboard.writeText(`${window.location.origin}?config=${config}`);
    toast({
      title: "Configuração Copiada!",
      description: "Link para compartilhamento copiado para área de transferência",
    });
  };

  const handleClear = () => {
    setHouses(houses.map(h => ({ ...h, odd: "", stake: "", commission: false, freebet: false, oddIncrease: false })));
    setInvestment("100");
    toast({
      title: "Dados Limpos",
      description: "Todas as informações foram resetadas",
    });
  };

  return (
    <Card className="glass-card p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gradient mb-2">Calculadora ArbiPro</h2>
          <p className="text-muted-foreground">Calcule stakes otimizados para garantir lucro em qualquer resultado</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={addHouse}
            disabled={numHouses >= 6}
            className="border-primary/50 hover:bg-primary/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Casa
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={removeHouse}
            disabled={numHouses <= 2}
            className="border-destructive/50 hover:bg-destructive/10"
          >
            <Minus className="w-4 h-4 mr-2" />
            Casa
          </Button>
        </div>
      </div>

      {/* Investment & ROI Display */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="investment">Investimento Total</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">R$</span>
            <Input
              id="investment"
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="pl-10 bg-muted/50 border-primary/30 focus:border-primary text-lg font-medium"
            />
          </div>
        </div>

        <div className="glass-card p-6 rounded-lg border-success/50 space-y-1">
          <p className="text-sm text-muted-foreground">ROI Estimado</p>
          <p className="text-4xl font-black text-success">+{calculateROI()}%</p>
        </div>
      </div>

      {/* Betting Houses */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span>Casas de Apostas</span>
          <Badge variant="outline" className="gradient-primary text-xs">
            {numHouses} casas
          </Badge>
        </h3>

        <div className="grid gap-4">
          {houses.map((house, index) => (
            <div
              key={house.id}
              className="glass-card p-6 rounded-lg space-y-4 glow-hover border-l-4 border-primary"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-lg">Casa {index + 1}</h4>
                <Badge variant="secondary">BACK</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`odd-${house.id}`}>Odd</Label>
                  <Input
                    id={`odd-${house.id}`}
                    type="number"
                    step="0.01"
                    placeholder="Ex: 2.50"
                    value={house.odd}
                    onChange={(e) => {
                      const newHouses = [...houses];
                      newHouses[index].odd = e.target.value;
                      setHouses(newHouses);
                    }}
                    className="bg-muted/50 border-primary/30 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`stake-${house.id}`}>Stake</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                    <Input
                      id={`stake-${house.id}`}
                      type="number"
                      placeholder="Calculado automaticamente"
                      value={house.stake}
                      className="pl-10 bg-muted/50 border-primary/30"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={house.commission ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const newHouses = [...houses];
                    newHouses[index].commission = !newHouses[index].commission;
                    setHouses(newHouses);
                  }}
                >
                  Comissão
                </Badge>
                <Badge
                  variant={house.freebet ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const newHouses = [...houses];
                    newHouses[index].freebet = !newHouses[index].freebet;
                    setHouses(newHouses);
                  }}
                >
                  Freebet
                </Badge>
                <Badge
                  variant={house.oddIncrease ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const newHouses = [...houses];
                    newHouses[index].oddIncrease = !newHouses[index].oddIncrease;
                    setHouses(newHouses);
                  }}
                >
                  Aumento de Odd
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          onClick={handleShare}
          className="flex-1 gradient-glow font-bold"
          size="lg"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Compartilhar Configuração
        </Button>
        <Button
          onClick={handleClear}
          variant="outline"
          className="border-destructive/50 hover:bg-destructive/10"
          size="lg"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Limpar Dados
        </Button>
      </div>
    </Card>
  );
};
