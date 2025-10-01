import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { CalculatorCard } from "@/components/CalculatorCard";
import { RegulatedHouses } from "@/components/RegulatedHouses";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

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
            <CalculatorCard />
            
            {/* FreePro Card Placeholder */}
            <div className="glass-card p-8 text-center border-dashed border-2 border-primary/30">
              <h3 className="text-2xl font-bold text-muted-foreground mb-2">Calculadora FreePro</h3>
              <p className="text-muted-foreground">Em breve - Sistema para apostas gratuitas</p>
            </div>
          </div>
        </div>
      </section>

      <RegulatedHouses />
      <About />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-muted/50 border-t border-border/50">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 SharkDev - Ferramentas Profissionais de Apostas • Código Aberto
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
