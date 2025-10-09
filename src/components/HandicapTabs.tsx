import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HandicapTable } from "./HandicapTable";
import { HandicapProtection } from "./HandicapProtection";
import { CasasRegulamentadasWrapper } from "./CasasRegulamentadasWrapper";
import { Target, Shield, ShieldCheck } from "lucide-react";

export const HandicapTabs = () => {
  const [activeTab, setActiveTab] = useState("handicap");

  return (
    <section id="handicap-casas" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-8 h-14 p-1 bg-background/50 backdrop-blur-sm border border-border/50">
            <TabsTrigger 
              value="handicap" 
              className="text-sm md:text-base font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--shark-gradient-start))] data-[state=active]:to-[hsl(var(--shark-gradient-end))] data-[state=active]:text-white transition-all duration-300"
            >
              <Target className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Handicap</span>
              <span className="sm:hidden">H. Asiático</span>
            </TabsTrigger>
            <TabsTrigger 
              value="protection" 
              className="text-sm md:text-base font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--shark-gradient-start))] data-[state=active]:to-[hsl(var(--shark-gradient-end))] data-[state=active]:text-white transition-all duration-300"
            >
              <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Proteção</span>
              <span className="sm:hidden">Proteção</span>
            </TabsTrigger>
            <TabsTrigger 
              value="casas" 
              className="text-sm md:text-base font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--shark-gradient-start))] data-[state=active]:to-[hsl(var(--shark-gradient-end))] data-[state=active]:text-white transition-all duration-300"
            >
              <Shield className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Casas Regulamentadas</span>
              <span className="sm:hidden">Casas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="handicap" className="mt-0">
            <HandicapTable />
          </TabsContent>

          <TabsContent value="protection" className="mt-0">
            <HandicapProtection />
          </TabsContent>

          <TabsContent value="casas" className="mt-0">
            <CasasRegulamentadasWrapper />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
