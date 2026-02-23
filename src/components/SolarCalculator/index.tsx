import { useState } from "react";
import { Sun, Zap, Grid3X3, LayoutGrid, Ruler } from "lucide-react";
import greenlineLogo from "@/assets/greenline-logo.png";
import greenlineLogoWhite from "@/assets/greenline-logo-white.png";
import InputSection from "./InputSection";
import SolarChart from "./SolarChart";
import ResultCards from "./ResultCards";
import LeadForm from "./LeadForm";
import FormulasSection from "./FormulasSection";
import PurchaseOptions from "./PurchaseOptions";
import { useCalculations } from "./useCalculations";

const SolarCalculator = () => {
  const [annualMwh, setAnnualMwh] = useState(100);
  const [exposure, setExposure] = useState("medium");

  const calc = useCalculations(annualMwh, exposure);

  return (
    <div className="min-h-screen bg-background py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
            <Sun className="w-4 h-4" />
            Energoefektivitātes kalkulators
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Aprēķiniet, cik iespējams <span className="text-primary">nopelnīt</span> uzstādot mūsu saules paneļus</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Iegādājieties saules paneļus pie tiešajiem ražotāja partneriem - GreenLine energy             

          </p>
        </div>

        {/* Savings Banner */}
        <div
          className="relative overflow-hidden rounded-2xl p-6 text-primary-foreground animate-fade-in-up"
          style={{ background: "linear-gradient(135deg, hsl(82, 100%, 35%), hsl(82, 80%, 42%))" }}>

          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-6 -translate-x-6" />
          <div className="relative flex flex-col items-center gap-2">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium opacity-90">Kopējais ietaupījums 25 gados</p>
                <p className="text-3xl sm:text-4xl font-extrabold">
                  €{calc.totalSavings25.toLocaleString("lv-LV")}
                </p>
              </div>
              <img src={greenlineLogoWhite} alt="GreenLine Energy" className="h-36 sm:h-48 object-contain brightness-0 invert drop-shadow-lg" />
              <div className="text-center sm:text-right space-y-1">
                <div>
                  <p className="text-sm opacity-90">Sistēmas izmaksas ar uzstādīšanu</p>
                  <p className="text-lg font-bold">
                    €{calc.systemCost.toLocaleString("lv-LV")}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Altum atbalsts</p>
                  <p className="text-lg font-bold">
                    -€{Math.round(calc.systemCost * 0.3).toLocaleString("lv-LV")}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Ietaupījums katru gadu</p>
                  <p className="text-lg font-bold">
                    €{Math.round(annualMwh * 1000 * 0.25 * 0.8).toLocaleString("lv-LV")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-solar-sm">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sistēmas jauda</p>
              <p className="text-lg font-bold text-foreground">{calc.systemKw} kW</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-solar-sm">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent">
              <Grid3X3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Paneļu skaits</p>
              <p className="text-lg font-bold text-foreground">~{calc.panelCount} paneļi</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-solar-sm">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent">
              <Ruler className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Nepieciešamā jumta platība</p>
              <p className="text-lg font-bold text-foreground">~{calc.roofSpaceM2} m²</p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-solar-sm animate-fade-in-up">
          <InputSection
            annualMwh={annualMwh}
            setAnnualMwh={setAnnualMwh}
            exposure={exposure}
            setExposure={setExposure} />

        </div>

        {/* Purchase Options */}
        <PurchaseOptions annualMwh={annualMwh} />

        {/* Chart */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-solar-sm animate-fade-in-up">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Izmaksu salīdzinājums (25 gadi)
          </h2>
          <SolarChart
            withoutPanels={calc.withoutPanels}
            withPanels={calc.withPanels}
            withBattery={calc.withBattery} />

        </div>

        {/* Result Cards */}
        <div className="animate-fade-in-up">
          <ResultCards
            co2Savings={calc.co2Savings}
            propertyIncrease={calc.propertyIncrease}
            paybackYears={calc.paybackYears} />

        </div>

        {/* Lead Form */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-solar-sm animate-fade-in-up">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Saņemiet bezmaksas piedāvājumu</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Aizpildiet formu un mēs sagatavosim individuālu piedāvājumu
            </p>
          </div>
          <LeadForm />
        </div>

        {/* Formulas */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-solar-sm animate-fade-in-up">
          <FormulasSection />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground pb-4">
          * Aprēķini ir indikatīvi un var atšķirties no faktiskajiem rezultātiem.
        </p>
      </div>
    </div>);

};

export default SolarCalculator;