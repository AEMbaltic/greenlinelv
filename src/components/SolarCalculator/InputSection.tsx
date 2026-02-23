import { Sun } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface InputSectionProps {
  annualMwh: number;
  setAnnualMwh: (v: number) => void;
  exposure: string;
  setExposure: (v: string) => void;
}

const exposureOptions = [
{ value: "low", label: "Zema", icon: "☁️", desc: "Ēnains rajons" },
{ value: "medium", label: "Vidēja", icon: "⛅", desc: "Daļēji saulains" },
{ value: "high", label: "Augsta", icon: "☀️", desc: "Pilnīgi saulains" }];


const InputSection = ({
  annualMwh,
  setAnnualMwh,
  exposure,
  setExposure
}: InputSectionProps) => {
  const rangeRef = useRef<HTMLInputElement>(null);
  const [thumbPos, setThumbPos] = useState("5.26%");

  useEffect(() => {
    const pct = ((annualMwh - 50) / (1000 - 50)) * 100;
    setThumbPos(`${pct}%`);
  }, [annualMwh]);

  return (
    <div className="space-y-8">
      {/* Annual MWh */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sun className="w-4 h-4 text-primary" />
          Kāds ir Jūsu energopatēriņš gadā?
        </label>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 flex items-center">
            <input
              ref={rangeRef}
              type="range"
              min={50}
              max={1000}
              step={10}
              value={annualMwh}
              onChange={(e) => setAnnualMwh(Number(e.target.value))}
              className="w-full" />
            <div
              className="slider-pulse-ring"
              style={{ "--thumb-position": thumbPos } as React.CSSProperties}
            />
          </div>
          <div className="relative">
            <input
              type="number"
              min={50}
              max={1000}
              value={annualMwh}
              onChange={(e) => setAnnualMwh(Math.max(50, Math.min(1000, Number(e.target.value))))}
              className="w-32 h-11 rounded-lg border border-border bg-background px-3 pr-14 text-right font-semibold text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">MWh</span>
          </div>
        </div>
      </div>

      {/* Exposure */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">
          Saules ekspozīcija
        </label>
        <div className="grid grid-cols-3 gap-3">
          {exposureOptions.map((opt) =>
          <button
            key={opt.value}
            onClick={() => setExposure(opt.value)}
            className={`relative flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
            exposure === opt.value ?
            "border-primary bg-accent shadow-solar-glow" :
            "border-border bg-background hover:border-primary/30 hover:bg-accent/50"}`
            }>

              <span className="text-2xl">{opt.icon}</span>
              <span className="text-sm font-semibold text-foreground">{opt.label}</span>
              <span className="text-xs text-muted-foreground">{opt.desc}</span>
            </button>
          )}
        </div>
      </div>
    </div>);

};

export default InputSection;