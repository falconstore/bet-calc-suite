import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Mail, Github, MessageSquare } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contato" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Sugestões, dúvidas ou feedback? Estamos aqui para ajudar!
          </p>
        </div>

        <Card className="glass-card p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-6">
            <Button
              variant="outline"
              className="h-auto flex-col gap-4 p-6 border-primary/50 hover:bg-primary/10 glow-hover"
              asChild
            >
              <a href="mailto:contato@sharkdev.com" target="_blank" rel="noopener noreferrer">
                <Mail className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <p className="font-bold text-lg">Email</p>
                  <p className="text-sm text-muted-foreground">contato@sharkdev.com</p>
                </div>
              </a>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col gap-4 p-6 border-primary/50 hover:bg-primary/10 glow-hover"
              asChild
            >
              <a href="https://github.com/falconstore/sharkdev" target="_blank" rel="noopener noreferrer">
                <Github className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <p className="font-bold text-lg">GitHub</p>
                  <p className="text-sm text-muted-foreground">Código Aberto</p>
                </div>
              </a>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col gap-4 p-6 border-primary/50 hover:bg-primary/10 glow-hover"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <p className="font-bold text-lg">Telegram</p>
                  <p className="text-sm text-muted-foreground">Comunidade</p>
                </div>
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
