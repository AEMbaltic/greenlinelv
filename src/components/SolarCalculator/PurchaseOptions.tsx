import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Car } from "lucide-react";
import taycanImage from "@/assets/porsche-taycan.jpg";

interface PurchaseOptionsProps {
  annualMwh: number;
}

const PurchaseOptions = ({ annualMwh }: PurchaseOptionsProps) => {
  const [checked, setChecked] = useState(false);

  if (annualMwh < 70) return null;

  const taycanCount = Math.floor((annualMwh - 70) / 30) + 1;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-solar-sm animate-fade-in-up">
      <div className="flex items-center gap-2 mb-4">
        <Car className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Par brīvajiem līdzekļiem Jūs varētu iegādāties:

        </h2>
      </div>

      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <Checkbox
            checked={checked}
            onCheckedChange={(v) => setChecked(v === true)}
            className="mt-1" />

          <div>
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
              Porsche Taycan {taycanCount > 1 ? `× ${taycanCount}` : ""}
            </span>
            <p className="text-sm text-muted-foreground">
              Ar Jūsu ietaupījumiem varat atļauties{" "}
              {taycanCount > 1 ? `${taycanCount} Porsche Taycan automašīnas` : "Porsche Taycan"}!
            </p>
          </div>
        </label>

        <div className="flex flex-wrap gap-4 mt-4">
          {Array.from({ length: taycanCount }).map((_, i) =>
          <div
            key={i}
            className="relative rounded-xl overflow-hidden border border-border shadow-solar-sm transition-transform hover:scale-105"
            style={{ maxWidth: taycanCount > 2 ? "180px" : "260px" }}>

              <img
              src={taycanImage}
              alt={`Porsche Taycan #${i + 1}`}
              className="w-full h-auto object-cover" />

              {taycanCount > 1 &&
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  #{i + 1}
                </div>
            }
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default PurchaseOptions;