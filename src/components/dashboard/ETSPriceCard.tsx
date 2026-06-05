"use client";

import { Card } from "@/components/ui/card";
import { ETSPriceWidget } from "@/components/shared/ETSPriceWidget";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// 7-day mock series ending at the current quoted price.
const EU_SERIES = [
  { day: "Mon", price: 63.1 },
  { day: "Tue", price: 63.8 },
  { day: "Wed", price: 62.9 },
  { day: "Thu", price: 64.2 },
  { day: "Fri", price: 64.0 },
  { day: "Sat", price: 64.7 },
  { day: "Sun", price: 65.0 },
];

const UK_SERIES = [
  { day: "Mon", price: 44.2 },
  { day: "Tue", price: 44.0 },
  { day: "Wed", price: 44.6 },
  { day: "Thu", price: 45.1 },
  { day: "Fri", price: 44.8 },
  { day: "Sat", price: 45.0 },
  { day: "Sun", price: 45.0 },
];

export function ETSPriceCard() {
  return (
    <Card className="flex h-full flex-col p-5">
      <Tabs defaultValue="eu" className="flex h-full flex-col">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Carbon price</h3>
          <TabsList className="h-8">
            <TabsTrigger value="eu" className="px-3 py-1 text-xs">
              EU ETS
            </TabsTrigger>
            <TabsTrigger value="uk" className="px-3 py-1 text-xs">
              UK ETS
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="eu" className="min-h-0 flex-1">
          <ETSPriceWidget
            market="EU ETS"
            price={65.0}
            currency="EUR"
            changePercent={2.4}
            series={EU_SERIES}
            asOf="5 Jun 2026"
          />
        </TabsContent>
        <TabsContent value="uk" className="min-h-0 flex-1">
          <ETSPriceWidget
            market="UK ETS"
            price={45.0}
            currency="GBP"
            changePercent={0.4}
            series={UK_SERIES}
            asOf="5 Jun 2026"
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
