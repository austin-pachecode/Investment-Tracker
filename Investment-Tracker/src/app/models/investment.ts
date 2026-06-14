import { InvestmentType } from './investment-type';

export interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  /** Total amount the individual has contributed */
  totalContributed: number;
  /** Current market/account value */
  currentValue: number;
  /** Optional ticker symbol for stocks/ETFs */
  symbol?: string;
  /** ISO date string of last value update */
  lastUpdated: string;
  notes?: string;
}

export interface PortfolioSummary {
  totalContributed: number;
  totalCurrentValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}

export function computeGainLoss(investment: Investment): number {
  return investment.currentValue - investment.totalContributed;
}

export function computeGainLossPercent(investment: Investment): number {
  if (investment.totalContributed === 0) {
    return 0;
  }
  return (computeGainLoss(investment) / investment.totalContributed) * 100;
}

export function computePortfolioSummary(investments: Investment[]): PortfolioSummary {
  const totalContributed = investments.reduce((sum, i) => sum + i.totalContributed, 0);
  const totalCurrentValue = investments.reduce((sum, i) => sum + i.currentValue, 0);
  const totalGainLoss = totalCurrentValue - totalContributed;
  const totalGainLossPercent =
    totalContributed === 0 ? 0 : (totalGainLoss / totalContributed) * 100;

  return {
    totalContributed,
    totalCurrentValue,
    totalGainLoss,
    totalGainLossPercent,
  };
}
