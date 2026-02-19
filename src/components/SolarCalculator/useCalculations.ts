import { useMemo } from "react";

interface CalcResult {
  withoutPanels: number[];
  withPanels: number[];
  withBattery: number[];
  co2Savings: number;
  propertyIncrease: number;
  paybackYears: number;
  totalSavings25: number;
}

const exposureMultiplier: Record<string, number> = {
  low: 0.75,
  medium: 1.0,
  high: 1.15,
};

export function useCalculations(
  monthlyBill: number,
  monthlyKwh: number,
  exposure: string
): CalcResult {
  return useMemo(() => {
    const years = 25;
    const annualBill = monthlyBill * 12;
    const inflationRate = 0.04; // constant 4% per year
    const expMult = exposureMultiplier[exposure] || 1;

    // System sizing: ~6kW per €100/month bill
    const systemKw = (monthlyBill / 100) * 6;
    const systemCostPerKw = 1200;
    const panelCost = systemKw * systemCostPerKw;
    const batteryCost = panelCost * 0.35;

    const panelSavingsRate = 0.9 * expMult;
    const batterySavingsRate = 1.0;

    const withoutPanels: number[] = [0];
    const withPanels: number[] = [panelCost];
    const withBattery: number[] = [panelCost + batteryCost];

    for (let y = 1; y <= years; y++) {
      const yearCost = annualBill * Math.pow(1 + inflationRate, y);
      withoutPanels.push(Math.round(withoutPanels[y - 1] + yearCost));
      withPanels.push(Math.round(withPanels[y - 1] + yearCost * (1 - panelSavingsRate)));
      withBattery.push(Math.round(withBattery[y - 1] + yearCost * (1 - batterySavingsRate)));
    }

    // CO2: ~0.5 kg per kWh
    const annualKwh = monthlyKwh * 12;
    const co2Savings = Math.round(annualKwh * 0.5 * years * expMult);

    const propertyIncrease = Math.round(panelCost * 0.04 * 100);

    let paybackYears = years;
    for (let y = 1; y <= years; y++) {
      if (withoutPanels[y] - withPanels[y] >= panelCost) {
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
    };
  }, [monthlyBill, monthlyKwh, exposure]);
}
