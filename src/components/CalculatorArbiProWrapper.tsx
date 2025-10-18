import { useEffect, useRef } from "react";

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
    
    console.log('ArbiProWrapper: Iniciando...');
    console.log('ArbiProWrapper: window.ArbiPro disponível?', !!window.ArbiPro);
    console.log('ArbiProWrapper: containerRef.current:', containerRef.current);
    
    const initCalculator = () => {
      if (window.ArbiPro && containerRef.current) {
        try {
          console.log('ArbiProWrapper: Inicializando ArbiPro...');
          const calculator = new window.ArbiPro();
          console.log('ArbiProWrapper: Calculator criado:', calculator);
          calculator.init();
          console.log('ArbiProWrapper: Calculator.init() chamado');
          initializedRef.current = true;
        } catch (error) {
          console.error('❌ Erro ao inicializar ArbiPro:', error);
        }
      } else {
        console.log('ArbiProWrapper: Não foi possível inicializar - ArbiPro ou container não disponível');
      }
    };

    // Tentar inicializar imediatamente
    if (window.ArbiPro) {
      console.log('ArbiProWrapper: ArbiPro já disponível, inicializando...');
      initCalculator();
    } else {
      console.log('ArbiProWrapper: Aguardando ArbiPro carregar...');
      // Aguardar o script carregar
      const checkInterval = setInterval(() => {
        if (window.ArbiPro) {
          console.log('ArbiProWrapper: ArbiPro detectado!');
          initCalculator();
          clearInterval(checkInterval);
        }
      }, 100);

      // Timeout de segurança
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.ArbiPro) {
          console.error('❌ Timeout: ArbiPro não carregou em 5 segundos');
        }
      }, 5000);
    }
  }, []);

  return (
    <div className="w-full">
      <div id="panel-1" className="w-full">
        <div id="app" ref={containerRef} className="calculator-container"></div>
      </div>
    </div>
  );
};
