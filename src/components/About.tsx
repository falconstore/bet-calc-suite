import { Card } from "./ui/card";
import { Target, Zap, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Precisão Matemática",
    description: "Algoritmos avançados para cálculos exatos de stakes e ROI",
  },
  {
    icon: Zap,
    title: "Velocidade",
    description: "Resultados instantâneos para aproveitar as melhores oportunidades",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Suas configurações são privadas e podem ser compartilhadas de forma segura",
  },
  {
    icon: TrendingUp,
    title: "Otimização",
    description: "Maximize seus lucros com estratégias comprovadas de arbitragem",
  },
];

export const About = () => {
  return (
    <section id="sobre" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Por que <span className="text-gradient">SharkDev</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ferramentas profissionais desenvolvidas para apostadores que levam a sério a otimização de resultados
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="glass-card p-8 glow-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg gradient-glow">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="glass-card p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ferramentas Gratuitas e de Código Aberto
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            O SharkDev é um projeto totalmente gratuito, desenvolvido para ajudar a comunidade de apostadores 
            profissionais a otimizar suas estratégias com ferramentas de qualidade profissional.
          </p>
        </Card>
      </div>
    </section>
  );
};
