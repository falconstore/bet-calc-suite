import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { CalculatorTabs } from "@/components/CalculatorTabs";
import { CasasRegulamentadasWrapper } from "@/components/CasasRegulamentadasWrapper";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      {/* Calculadoras em Abas */}
      <CalculatorTabs />

      {/* Casas Regulamentadas */}
      <CasasRegulamentadasWrapper />
      
      {/* Sobre e Contato */}
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
