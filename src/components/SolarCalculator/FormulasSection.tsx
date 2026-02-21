import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FormulasSection = () => {
  const formulas = [
    {
      title: "Sistēmas jauda (kW)",
      formula: "systemKw = energopatēriņš_gadā (MWh) × 1000 ÷ 950",
      description: "950 kWh/kWp — vidējā saules enerģijas izstrāde gadā Latvijā",
    },
    {
      title: "Paneļu skaits",
      formula: "panelCount = systemKw × 2",
      description: "~2 paneļi uz katru kW sistēmas jaudas",
    },
    {
      title: "Jumta platība (m²)",
      formula: "roofSpace = systemKw × 2.31",
      description: "Aprēķināts no references: 650 kW sistēmai nepieciešami ~1500 m²",
    },
    {
      title: "Sistēmas izmaksas (€)",
      formula: "systemCost = 10 000 + systemKw × 500",
      description: "€10 000 fiksētās instalācijas izmaksas + €500/kW mainīgās izmaksas",
    },
    {
      title: "Altum atbalsts (€)",
      formula: "altumSupport = systemCost × 0.30",
      description: "30% no kopējām sistēmas izmaksām",
    },
    {
      title: "Gada elektrības rēķins (€)",
      formula: "annualBill = energopatēriņš (kWh) × 0.30 €/kWh",
      description: "Bāzes elektroenerģijas cena: €0.30/kWh",
    },
    {
      title: "Elektroenerģijas cenas pieaugums",
      formula: "yearCost(y) = annualBill × (1 + 0.05)^y",
      description: "Konstants 5% ikgadējs cenas pieaugums",
    },
    {
      title: "Ietaupījums ar paneļiem",
      formula: "savings = yearCost × 0.90 × exposureMultiplier",
      description: "90% ietaupījums, koriģēts ar saules ekspozīcijas koeficientu (zema: 0.75, vidēja: 1.0, augsta: 1.15)",
    },
    {
      title: "Ietaupījums ar paneļiem + akumulatoru",
      formula: "savings = yearCost × 1.00",
      description: "100% ietaupījums; akumulatora izmaksas = sistēmas izmaksas × 0.35",
    },
    {
      title: "Atmaksāšanās laiks",
      formula: "Gads y, kad: Σ(ietaupījumi 1..y) ≥ systemCost",
      description: "Pirmais gads, kurā kumulatīvais ietaupījums pārsniedz sistēmas izmaksas",
    },
    {
      title: "CO₂ ietaupījums (kg)",
      formula: "co2 = energopatēriņš (kWh) × 0.5 × 25 × exposureMultiplier",
      description: "~0.5 kg CO₂ uz katru kWh, 25 gadu periodā",
    },
    {
      title: "Īpašuma vērtības pieaugums (€)",
      formula: "propertyIncrease = systemCost × 0.04 × 100",
      description: "+4% no sistēmas vērtības",
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="formulas" className="border-none">
        <AccordionTrigger className="text-lg font-bold text-foreground hover:no-underline">
          Izmantotās formulas
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pt-2">
            {formulas.map((f) => (
              <div key={f.title} className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="text-sm font-semibold text-foreground mb-1">{f.title}</p>
                <code className="block text-sm font-mono text-primary bg-accent/50 rounded px-3 py-1.5 mb-2">
                  {f.formula}
                </code>
                <p className="text-xs text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FormulasSection;
