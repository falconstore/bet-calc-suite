import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, ExternalLink } from "lucide-react";

const houses = [
  { name: "Bet365", status: "Regulamentada", url: "#" },
  { name: "Betano", status: "Regulamentada", url: "#" },
  { name: "Betfair", status: "Regulamentada", url: "#" },
  { name: "KTO", status: "Regulamentada", url: "#" },
  { name: "Sportingbet", status: "Regulamentada", url: "#" },
  { name: "Betway", status: "Regulamentada", url: "#" },
];

export const RegulatedHouses = () => {
  return (
    <section id="casas" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Casas <span className="text-gradient">Regulamentadas</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Apenas plataformas verificadas e autorizadas no Brasil
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map((house, index) => (
            <Card
              key={house.name}
              className="glass-card p-6 glow-hover group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {house.name}
                  </h3>
                  <Badge className="mt-2 bg-success/20 text-success border-success/50">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {house.status}
                  </Badge>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
