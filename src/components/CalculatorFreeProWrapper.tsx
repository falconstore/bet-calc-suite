import { useEffect, useRef } from "react";

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
    <div className="w-full">
      <div id="panel-2" className="w-full">
        <iframe 
          id="calc2frame" 
          ref={containerRef}
          className="w-full min-h-[800px] border-0 rounded-lg calculator-iframe"
          title="Calculadora FreePro"
        />
      </div>
    </div>
  );
};
