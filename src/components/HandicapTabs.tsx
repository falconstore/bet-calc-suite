import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HandicapTable } from "./HandicapTable";
import { CasasRegulamentadasWrapper } from "./CasasRegulamentadasWrapper";
import { Target, Shield } from "lucide-react";

export const HandicapTabs = () => {
  const [activeTab, setActiveTab] = useState("handicap");

  return (
    <section id="handicap-casas" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 h-14 p-1 bg-background/50 backdrop-blur-sm border border-border/50">
            <TabsTrigger 
              value="handicap" 
              className="text-base font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--shark-gradient-start))] data-[state=active]:to-[hsl(var(--shark-gradient-end))] data-[state=active]:text-white transition-all duration-300"
            >
              <Target className="w-5 h-5 mr-2" />
              Handicap
            </TabsTrigger>
            <TabsTrigger 
              value="casas" 
              className="text-base font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--shark-gradient-start))] data-[state=active]:to-[hsl(var(--shark-gradient-end))] data-[state=active]:text-white transition-all duration-300"
            >
              <Shield className="w-5 h-5 mr-2" />
              Casas Regulamentadas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="handicap" className="mt-0">
            <HandicapTable />
          </TabsContent>

          <TabsContent value="casas" className="mt-0">
            <CasasRegulamentadasWrapper />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
