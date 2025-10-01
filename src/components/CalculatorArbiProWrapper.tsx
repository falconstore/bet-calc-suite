import { useEffect, useRef } from "react";
import { Card } from "./ui/card";

export const CalculatorArbiProWrapper = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    
    const loadCalculator = async () => {
      try {
        // Carregar dependências na ordem correta
        // @ts-ignore - vanilla JS modules
        await import('/js/app-config.js');
        // @ts-ignore - vanilla JS modules
        await import('/js/helpers.js');
        // @ts-ignore - vanilla JS modules
        const arbiProModule = await import('/js/arbipro.js');
        
        if (containerRef.current && arbiProModule.ArbiPro) {
          const calculator = new arbiProModule.ArbiPro();
          calculator.init();
          initializedRef.current = true;
        }
      } catch (error) {
        console.error('Erro ao carregar calculadora ArbiPro:', error);
      }
    };

    loadCalculator();
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
