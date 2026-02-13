import { Leaf, Home, Clock } from "lucide-react";

interface ResultCardsProps {
  co2Savings: number;
  propertyIncrease: number;
  paybackYears: number;
}

const ResultCards = ({ co2Savings, propertyIncrease, paybackYears }: ResultCardsProps) => {
  const cards = [
    {
      icon: Leaf,
      label: "CO₂ ietaupījums",
      value: `${co2Savings.toLocaleString("lv-LV")} kg`,
      sub: "25 gadu periodā",
      color: "text-primary",
      bg: "bg-accent",
    },
    {
      icon: Home,
      label: "Īpašuma vērtības pieaugums",
      value: `+${propertyIncrease.toLocaleString("lv-LV")} €`,
      sub: "+4% no sistēmas vērtības",
      color: "text-chart-battery",
      bg: "bg-blue-50",
    },
    {
      icon: Clock,
      label: "Atmaksāšanās laiks",
      value: `~${paybackYears} gadi`,
      sub: "Vidējais termiņš",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-solar-sm hover:shadow-solar-md transition-shadow duration-300"
        >
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${card.bg} mb-3`}>
            <card.icon className={`w-5 h-5 ${card.color}`} />
          </div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            {card.label}
          </p>
          <p className="text-2xl font-bold text-foreground animate-counter">{card.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultCards;
