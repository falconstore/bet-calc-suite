import { useEffect, useRef } from "react";
import { Card } from "./ui/card";

export const CalculatorFreeProWrapper = () => {
  const containerRef = useRef<HTMLIFrameElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    
    const loadCalculator = async () => {
      try {
        // @ts-ignore - vanilla JS modules
        await import('/js/freepro-content.js');
        // @ts-ignore - vanilla JS modules
        const freeProModule = await import('/js/freepro.js');
        
        if (containerRef.current && freeProModule.FreePro) {
          const calculator = new freeProModule.FreePro();
          calculator.init();
          initializedRef.current = true;
        }
      } catch (error) {
        console.error('Erro ao carregar calculadora FreePro:', error);
      }
    };

    loadCalculator();
  }, []);

  return (
    <section id="freepro" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Calculadora <span className="text-gradient">FreePro</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Extração de Freebets com múltiplas entradas
          </p>
        </div>

        <Card className="glass-card p-6 md:p-8">
          <div id="panel-2">
            <iframe 
              id="calc2frame" 
              ref={containerRef}
              className="w-full min-h-[800px] border-0"
              title="Calculadora FreePro"
            />
          </div>
        </Card>
      </div>
    </section>
  );
};
