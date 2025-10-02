import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X, Percent } from "lucide-react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleBetbraClick = () => {
    window.open("SEU_LINK_DE_INDICACAO_AQUI", "_blank");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl font-black"
          >
            <span className="text-gradient">Shark</span>
            <span className="text-foreground"> Calculadoras</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("calculadoras")}
              className="hover:text-primary"
            >
              Calculadoras
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("casas")}
              className="hover:text-primary"
            >
              Casas Regulamentadas
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("sobre")}
              className="hover:text-primary"
            >
              Sobre
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contato")}
              className="hover:text-primary"
            >
              Contato
            </Button>
            
            {/* Separador */}
            <div className="w-px h-6 bg-border/50" />
            
            {/* Botão Betbra Destacado */}
            <Button
              onClick={handleBetbraClick}
              variant="outline"
              className="relative border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all group"
            >
              <span className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-primary" />
                <span className="font-semibold">2.8%</span>
                <span className="text-muted-foreground">Betbra</span>
              </span>
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {/* Botão Betbra Mobile */}
            <Button
              onClick={handleBetbraClick}
              variant="outline"
              className="w-full border-primary/30 bg-primary/5 hover:bg-primary/10"
            >
              <Percent className="w-4 h-4 mr-2 text-primary" />
              <span className="font-semibold">2.8% Betbra</span>
              <span className="text-xs text-muted-foreground ml-2">- Oferta Exclusiva</span>
            </Button>

            <Button
              variant="ghost"
              onClick={() => scrollToSection("calculadoras")}
              className="w-full justify-start hover:text-primary"
            >
              Calculadoras
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("casas")}
              className="w-full justify-start hover:text-primary"
            >
              Casas Regulamentadas
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("sobre")}
              className="w-full justify-start hover:text-primary"
            >
              Sobre
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contato")}
              className="w-full justify-start hover:text-primary"
            >
              Contato
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
