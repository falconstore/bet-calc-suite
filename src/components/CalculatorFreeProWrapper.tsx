import { useEffect, useRef } from "react";
import { Card } from "./ui/card";

declare global {
  interface Window {
    FreePro?: any;
    getFreeProfHTML?: () => string;
  }
}

export const CalculatorFreeProWrapper = () => {
  const containerRef = useRef<HTMLIFrameElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    
    const initCalculator = () => {
      if (window.FreePro && window.getFreeProfHTML && containerRef.current) {
        try {
          const iframe = containerRef.current;
          const htmlContent = window.getFreeProfHTML();
          
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(htmlContent);
            iframeDoc.close();
            
            iframe.dataset.loaded = "1";
            initializedRef.current = true;
          }
        } catch (error) {
          console.error('Erro ao inicializar FreePro:', error);
        }
      }
    };

    // Tentar inicializar imediatamente
    if (window.FreePro && window.getFreeProfHTML) {
      initCalculator();
    } else {
      // Aguardar o script carregar
      const checkInterval = setInterval(() => {
        if (window.FreePro && window.getFreeProfHTML) {
          initCalculator();
          clearInterval(checkInterval);
        }
      }, 100);

      // Timeout de segurança
      setTimeout(() => clearInterval(checkInterval), 5000);
    }
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
