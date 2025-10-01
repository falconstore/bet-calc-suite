import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Share2, Trash2, Plus, Minus, Settings2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// IMPORTANTE: Esta é apenas a estrutura visual
// A lógica de cálculo original do seu projeto deve ser integrada aqui
// NÃO modifique os cálculos existentes - apenas aplique este design

interface BettingHouse {
  id: number;
  name: string;
  odd: string;
  oddFinal: string;
  stake: string;
  commission: boolean;
  freebet: boolean;
  oddIncrease: boolean;
  stakeFixed: boolean;
}

export const CalculatorArbiPro = () => {
  const [numHouses, setNumHouses] = useState(2);
  const [investment, setInvestment] = useState("100");
  const [rounding, setRounding] = useState("0.01");
  const [houses, setHouses] = useState<BettingHouse[]>([
    { id: 1, name: "Casa 1", odd: "", oddFinal: "0.00", stake: "", commission: false, freebet: false, oddIncrease: false, stakeFixed: false },
    { id: 2, name: "Casa 2", odd: "", oddFinal: "0.00", stake: "", commission: false, freebet: false, oddIncrease: false, stakeFixed: false },
  ]);

  // AQUI: Integre sua lógica de cálculo original
  const calculateROI = () => {
    // Placeholder - use sua lógica existente
    return "0.00";
  };

  const calculateStakes = () => {
    // Placeholder - use sua lógica existente de cálculo de stakes
    console.log("Calcular stakes com sua lógica original");
  };

  const addHouse = () => {
    if (numHouses < 6) {
      const newId = numHouses + 1;
      setNumHouses(newId);
      setHouses([
        ...houses,
        { id: newId, name: `Casa ${newId}`, odd: "", oddFinal: "0.00", stake: "", commission: false, freebet: false, oddIncrease: false, stakeFixed: false },
      ]);
    }
  };

  const removeHouse = () => {
    if (numHouses > 2) {
      setNumHouses(numHouses - 1);
      setHouses(houses.slice(0, -1));
    }
  };

  const handleShare = () => {
    // AQUI: Use sua lógica de compartilhamento original
    const config = btoa(JSON.stringify({ houses, investment, rounding }));
    navigator.clipboard.writeText(`${window.location.origin}?config=${config}`);
    toast({
      title: "Configuração Copiada! 🔗",
      description: "Link para compartilhamento copiado",
    });
  };

  const handleClear = () => {
    setHouses(houses.map(h => ({ 
      ...h, 
      odd: "", 
      oddFinal: "0.00", 
      stake: "", 
      commission: false, 
      freebet: false, 
      oddIncrease: false,
      stakeFixed: false 
    })));
    setInvestment("100");
    toast({
      title: "Dados Limpos ✨",
      description: "Todas as informações foram resetadas",
    });
  };

  return (
    <Card className="glass-card p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-gradient">Calculadora ArbiPro</h2>
            <Badge className="gradient-glow">v2.0</Badge>
          </div>
          <p className="text-muted-foreground">
            Calcule stakes otimizados para garantir lucro em qualquer resultado
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={addHouse}
            disabled={numHouses >= 6}
            className="border-primary/50 hover:bg-primary/10 glow-hover"
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

      {/* Settings Section */}
      <div className="glass-card p-6 rounded-lg space-y-4 border-primary/30">
        <div className="flex items-center gap-2 mb-4">
          <Settings2 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold">Configurações</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Investment */}
          <div className="space-y-2">
            <Label htmlFor="investment" className="text-sm font-semibold">
              Investimento Total
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                R$
              </span>
              <Input
                id="investment"
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                className="pl-10 bg-muted/50 border-primary/30 focus:border-primary text-lg font-medium h-12"
                placeholder="100.00"
              />
            </div>
          </div>

          {/* Rounding */}
          <div className="space-y-2">
            <Label htmlFor="rounding" className="text-sm font-semibold">
              Arredondamento
            </Label>
            <Tabs value={rounding} onValueChange={setRounding} className="w-full">
              <TabsList className="grid grid-cols-4 w-full h-12 bg-muted/50">
                <TabsTrigger value="0.01" className="data-[state=active]:gradient-glow">
                  R$ 0,01
                </TabsTrigger>
                <TabsTrigger value="0.10" className="data-[state=active]:gradient-glow">
                  R$ 0,10
                </TabsTrigger>
                <TabsTrigger value="0.50" className="data-[state=active]:gradient-glow">
                  R$ 0,50
                </TabsTrigger>
                <TabsTrigger value="1.00" className="data-[state=active]:gradient-glow">
                  R$ 1,00
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* ROI Display */}
        <div className="glass-card p-6 rounded-lg border-success/50 space-y-1 bg-success/5">
          <p className="text-sm text-muted-foreground font-semibold">ROI Estimado</p>
          <p className="text-4xl font-black text-success">
            +{calculateROI()}%
          </p>
        </div>
      </div>

      {/* Betting Houses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span>Casas de Apostas</span>
            <Badge variant="outline" className="gradient-primary text-xs px-3">
              {numHouses} casas
            </Badge>
          </h3>
        </div>

        <div className="grid gap-4">
          {houses.map((house, index) => (
            <div
              key={house.id}
              className="glass-card p-6 rounded-lg space-y-4 glow-hover border-l-4 border-primary/70 transition-all"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-lg">{house.name}</h4>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="font-semibold">
                    BACK
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* ODD */}
                <div className="space-y-2">
                  <Label htmlFor={`odd-${house.id}`} className="text-sm font-semibold">
                    ODD
                  </Label>
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
                      calculateStakes();
                    }}
                    className="bg-muted/50 border-primary/30 focus:border-primary h-11"
                  />
                </div>

                {/* ODD FINAL */}
                <div className="space-y-2">
                  <Label htmlFor={`odd-final-${house.id}`} className="text-sm font-semibold">
                    ODD FINAL
                  </Label>
                  <Input
                    id={`odd-final-${house.id}`}
                    type="text"
                    value={house.oddFinal}
                    readOnly
                    className="bg-muted/50 border-secondary/30 text-secondary font-bold h-11"
                  />
                </div>

                {/* STAKE */}
                <div className="space-y-2">
                  <Label htmlFor={`stake-${house.id}`} className="text-sm font-semibold">
                    STAKE
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      R$
                    </span>
                    <Input
                      id={`stake-${house.id}`}
                      type="number"
                      placeholder="Auto"
                      value={house.stake}
                      className="pl-10 bg-muted/50 border-primary/30 font-bold h-11"
                      readOnly={!house.stakeFixed}
                    />
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                <Badge
                  variant={house.commission ? "default" : "outline"}
                  className="cursor-pointer transition-all glow-hover"
                  onClick={() => {
                    const newHouses = [...houses];
                    newHouses[index].commission = !newHouses[index].commission;
                    setHouses(newHouses);
                    calculateStakes();
                  }}
                >
                  Comissão
                </Badge>
                <Badge
                  variant={house.freebet ? "default" : "outline"}
                  className="cursor-pointer transition-all glow-hover"
                  onClick={() => {
                    const newHouses = [...houses];
                    newHouses[index].freebet = !newHouses[index].freebet;
                    setHouses(newHouses);
                    calculateStakes();
                  }}
                >
                  Freebet
                </Badge>
                <Badge
                  variant={house.oddIncrease ? "default" : "outline"}
                  className="cursor-pointer transition-all glow-hover"
                  onClick={() => {
                    const newHouses = [...houses];
                    newHouses[index].oddIncrease = !newHouses[index].oddIncrease;
                    setHouses(newHouses);
                    calculateStakes();
                  }}
                >
                  Aumento de Odd
                </Badge>
                <Badge
                  variant={house.stakeFixed ? "default" : "outline"}
                  className="cursor-pointer transition-all glow-hover"
                  onClick={() => {
                    const newHouses = [...houses];
                    newHouses[index].stakeFixed = !newHouses[index].stakeFixed;
                    setHouses(newHouses);
                  }}
                >
                  Stake Fixada
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results Table */}
      <div className="glass-card p-6 rounded-lg border-primary/30">
        <h3 className="text-xl font-bold mb-4">
          Resultados <span className="text-gradient">Shark ArbiPro</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-bold text-muted-foreground">Casa</th>
                <th className="text-left py-3 px-4 font-bold text-muted-foreground">Odd</th>
                <th className="text-left py-3 px-4 font-bold text-muted-foreground">Comissão</th>
                <th className="text-left py-3 px-4 font-bold text-muted-foreground">Stake</th>
                <th className="text-left py-3 px-4 font-bold text-muted-foreground">Lucro</th>
              </tr>
            </thead>
            <tbody>
              {houses.map((house) => (
                <tr key={house.id} className="border-b border-border/30 hover:bg-muted/20">
                  <td className="py-3 px-4 font-bold">{house.name}</td>
                  <td className="py-3 px-4">{house.oddFinal}</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4 font-bold">R$ {house.stake || "0"}</td>
                  <td className="py-3 px-4 font-bold text-success">R$ 0,00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          onClick={handleShare}
          className="flex-1 gradient-glow font-bold text-lg h-12"
          size="lg"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Compartilhar Configuração
        </Button>
        <Button
          onClick={handleClear}
          variant="outline"
          className="border-destructive/50 hover:bg-destructive/10 text-lg h-12"
          size="lg"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Limpar Dados
        </Button>
      </div>
    </Card>
  );
};
