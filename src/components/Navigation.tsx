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
          <div className="hidden md:flex items-center gap-4">
            {/* Botão Betbra Destacado */}
            <Button
              onClick={handleBetbraClick}
              className="bg-primary/90 hover:bg-primary text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.6)] transition-all hover-scale"
            >
              <Percent className="w-4 h-4 mr-2" />
              Betbra 2.8%
            </Button>

            <div className="w-px h-6 bg-border/50" />

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
              className="w-full bg-primary/90 hover:bg-primary text-primary-foreground mb-3"
            >
              <Percent className="w-4 h-4 mr-2" />
              Betbra 2.8% - Oferta Exclusiva
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
