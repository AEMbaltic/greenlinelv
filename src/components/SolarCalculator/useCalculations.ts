import { useMemo } from "react";

interface CalcResult {
  withoutPanels: number[];
  withPanels: number[];
  withBattery: number[];
  co2Savings: number;
  propertyIncrease: number;
  paybackYears: number;
  totalSavings25: number;
  systemKw: number;
  panelCount: number;
  systemCost: number;
  roofSpaceM2: number;
}

const exposureMultiplier: Record<string, number> = {
  low: 0.75,
  medium: 1.0,
  high: 1.15,
};

// Reference points:
// 100kW system = 200 panels = €59,000 = €590/kW
// 650kW system = 1500 m² roof → ~2.31 m²/kW
const COST_PER_KW = 590;
const PANELS_PER_KW = 2;
const ROOF_M2_PER_KW = 1500 / 650; // ~2.31
const SOLAR_YIELD_KWH_PER_KW = 950; // avg kWh produced per kWp per year in Latvia

export function useCalculations(
  annualMwh: number,
  exposure: string
): CalcResult {
  return useMemo(() => {
    const years = 25;
    const inflationRate = 0.05; // constant 5% per year
    const expMult = exposureMultiplier[exposure] || 1;

    // System sizing from annual consumption
    const annualKwh = annualMwh * 1000;
    const systemKw = Math.round(annualKwh / SOLAR_YIELD_KWH_PER_KW);
    const panelCount = Math.round(systemKw * PANELS_PER_KW);
    const systemCost = Math.round(systemKw * COST_PER_KW);
    const roofSpaceM2 = Math.round(systemKw * ROOF_M2_PER_KW);

    // Estimate annual electricity cost: ~0.20 €/kWh average
    const electricityPricePerKwh = 0.20;
    const annualBill = annualKwh * electricityPricePerKwh;

    const panelSavingsRate = 0.9 * expMult;
    const batterySavingsRate = 1.0;
    const batteryCost = systemCost * 0.35;

    const withoutPanels: number[] = [0];
    const withPanels: number[] = [systemCost];
    const withBattery: number[] = [systemCost + batteryCost];

    for (let y = 1; y <= years; y++) {
      const yearCost = annualBill * Math.pow(1 + inflationRate, y);
      withoutPanels.push(Math.round(withoutPanels[y - 1] + yearCost));
      withPanels.push(Math.round(withPanels[y - 1] + yearCost * (1 - panelSavingsRate)));
      withBattery.push(Math.round(withBattery[y - 1] + yearCost * (1 - batterySavingsRate)));
    }

    // CO2: ~0.5 kg per kWh
    const co2Savings = Math.round(annualKwh * 0.5 * years * expMult);

    const propertyIncrease = Math.round(systemCost * 0.04 * 100);

    let paybackYears = years;
    for (let y = 1; y <= years; y++) {
      if (withoutPanels[y] - withPanels[y] >= systemCost) {
        paybackYears = y;
        break;
      }
    }

    const totalSavings25 = withoutPanels[years] - withPanels[years];

    return {
      withoutPanels,
      withPanels,
      withBattery,
      co2Savings,
      propertyIncrease,
      paybackYears,
      totalSavings25,
      systemKw,
      panelCount,
      systemCost,
      roofSpaceM2,
    };
  }, [annualMwh, exposure]);
}
