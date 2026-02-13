import { Sun, TrendingUp } from "lucide-react";

interface InputSectionProps {
  monthlyBill: number;
  setMonthlyBill: (v: number) => void;
  priceIncrease: number;
  setPriceIncrease: (v: number) => void;
  exposure: string;
  setExposure: (v: string) => void;
}

const exposureOptions = [
  { value: "low", label: "Zema", icon: "☁️", desc: "Ēnains rajons" },
  { value: "medium", label: "Vidēja", icon: "⛅", desc: "Daļēji saulains" },
  { value: "high", label: "Augsta", icon: "☀️", desc: "Pilnīgi saulains" },
];

const InputSection = ({
  monthlyBill,
  setMonthlyBill,
  priceIncrease,
  setPriceIncrease,
  exposure,
  setExposure,
}: InputSectionProps) => {
  return (
    <div className="space-y-8">
      {/* Monthly Bill */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sun className="w-4 h-4 text-primary" />
          Vidējais elektrības rēķins mēnesī
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={30}
            max={500}
            step={5}
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(Number(e.target.value))}
            className="flex-1"
          />
          <div className="relative">
            <input
              type="number"
              min={30}
              max={500}
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Math.max(30, Math.min(500, Number(e.target.value))))}
              className="w-24 h-11 rounded-lg border border-border bg-background px-3 pr-8 text-right font-semibold text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">€</span>
          </div>
        </div>
      </div>

      {/* Price Increase */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <TrendingUp className="w-4 h-4 text-primary" />
          Elektroenerģijas cenas pieaugums gadā
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={10}
            step={0.5}
            value={priceIncrease}
            onChange={(e) => setPriceIncrease(Number(e.target.value))}
            className="flex-1"
          />
          <div className="relative">
            <input
              type="number"
              min={1}
              max={10}
              step={0.5}
              value={priceIncrease}
              onChange={(e) => setPriceIncrease(Math.max(1, Math.min(10, Number(e.target.value))))}
              className="w-24 h-11 rounded-lg border border-border bg-background px-3 pr-8 text-right font-semibold text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">%</span>
          </div>
        </div>
      </div>

      {/* Exposure */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">
          Saules ekspozīcija
        </label>
        <div className="grid grid-cols-3 gap-3">
          {exposureOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setExposure(opt.value)}
              className={`relative flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                exposure === opt.value
                  ? "border-primary bg-accent shadow-solar-glow"
                  : "border-border bg-background hover:border-primary/30 hover:bg-accent/50"
              }`}
            >
              <span className="text-2xl">{opt.icon}</span>
              <span className="text-sm font-semibold text-foreground">{opt.label}</span>
              <span className="text-xs text-muted-foreground">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputSection;
