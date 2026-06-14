export enum InvestmentType {
  Retirement = 'retirement',
  Savings = 'savings',
  Stocks = 'stocks',
  Bonds = 'bonds',
  Crypto = 'crypto',
  Other = 'other',
}

export const INVESTMENT_TYPE_LABELS: Record<InvestmentType, string> = {
  [InvestmentType.Retirement]: 'Retirement',
  [InvestmentType.Savings]: 'Savings',
  [InvestmentType.Stocks]: 'Stocks',
  [InvestmentType.Bonds]: 'Bonds',
  [InvestmentType.Crypto]: 'Crypto',
  [InvestmentType.Other]: 'Other',
};
