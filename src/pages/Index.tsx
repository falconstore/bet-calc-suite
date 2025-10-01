import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { CalculatorArbiPro } from "@/components/CalculatorArbiPro";
import { RegulatedHousesList } from "@/components/RegulatedHousesList";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      {/* Calculadoras Section */}
      <section id="calculadoras" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Calculadoras <span className="text-gradient">Profissionais</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Ferramentas avançadas para otimização de apostas esportivas
            </p>
          </div>
          
          <div className="space-y-8">
            <CalculatorArbiPro />
            
            {/* FreePro Card Placeholder */}
            <Card className="glass-card p-12 text-center border-dashed border-2 border-accent/30 space-y-4">
              <div className="inline-block p-4 rounded-full bg-accent/10 mb-4">
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-3xl font-bold text-gradient mb-2">Calculadora FreePro</h3>
              <p className="text-lg text-muted-foreground">Em breve - Sistema para apostas gratuitas</p>
              <Badge variant="outline" className="border-accent/50 text-accent">
                Coming Soon
              </Badge>
            </Card>
          </div>
        </div>
      </section>

      <RegulatedHousesList />
      <About />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-muted/50 border-t border-border/50">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Shark Calculadoras - Ferramentas Profissionais de Apostas • Código Aberto
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
