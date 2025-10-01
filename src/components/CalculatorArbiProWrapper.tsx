import { useEffect, useRef } from "react";
import { Card } from "./ui/card";

declare global {
  interface Window {
    ArbiPro?: any;
  }
}

export const CalculatorArbiProWrapper = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    
    const initCalculator = () => {
      if (window.ArbiPro && containerRef.current) {
        try {
          const calculator = new window.ArbiPro();
          calculator.init();
          initializedRef.current = true;
        } catch (error) {
          console.error('Erro ao inicializar ArbiPro:', error);
        }
      }
    };

    // Tentar inicializar imediatamente
    if (window.ArbiPro) {
      initCalculator();
    } else {
      // Aguardar o script carregar
      const checkInterval = setInterval(() => {
        if (window.ArbiPro) {
          initCalculator();
          clearInterval(checkInterval);
        }
      }, 100);

      // Timeout de segurança
      setTimeout(() => clearInterval(checkInterval), 5000);
    }
  }, []);

  return (
    <section id="arbipro" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Calculadora <span className="text-gradient">ArbiPro</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Arbitragem profissional com suporte a Lay, Freebet e Comissão
          </p>
        </div>

        <Card className="glass-card p-6 md:p-8">
          <div id="panel-1">
            <div id="app" ref={containerRef}></div>
          </div>
        </Card>
      </div>
    </section>
  );
};
