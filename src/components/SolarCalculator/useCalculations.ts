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
  priceIncrease: number,
  exposure: string
): CalcResult {
  return useMemo(() => {
    const years = 25;
    const annualBill = monthlyBill * 12;
    const inflationRate = priceIncrease / 100;
    const expMult = exposureMultiplier[exposure] || 1;

    // System sizing: ~6kW per €100/month bill
    const systemKw = (monthlyBill / 100) * 6;
    const systemCostPerKw = 1200;
    const panelCost = systemKw * systemCostPerKw;
    const batteryCost = panelCost * 0.35; // battery ~35% of panel cost

    const panelSavingsRate = 0.9 * expMult; // 90% savings adjusted by exposure
    const batterySavingsRate = 1.0; // 100% with battery

    const withoutPanels: number[] = [0];
    const withPanels: number[] = [panelCost];
    const withBattery: number[] = [panelCost + batteryCost];

    for (let y = 1; y <= years; y++) {
      const yearCost = annualBill * Math.pow(1 + inflationRate, y);
      withoutPanels.push(Math.round(withoutPanels[y - 1] + yearCost));
      withPanels.push(Math.round(withPanels[y - 1] + yearCost * (1 - panelSavingsRate)));
      withBattery.push(Math.round(withBattery[y - 1] + yearCost * (1 - batterySavingsRate)));
    }

    // CO2: ~0.5 kg per kWh, avg Latvian household uses ~3500 kWh/year per 100€ bill
    const annualKwh = (monthlyBill / 100) * 3500;
    const co2Savings = Math.round(annualKwh * 0.5 * years * expMult);

    // Property value increase: 4% of system cost
    const propertyIncrease = Math.round(panelCost * 0.04 * 100); // simplified as total increase

    // Payback: when panels savings exceed cost
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
  }, [monthlyBill, priceIncrease, exposure]);
}
