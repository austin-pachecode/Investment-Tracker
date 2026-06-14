import { Injectable, signal } from '@angular/core';

import { Investment } from '../models/investment';
import { InvestmentType } from '../models/investment-type';

const SAMPLE_INVESTMENTS: Investment[] = [
  {
    id: '1',
    name: '401(k)',
    type: InvestmentType.Retirement,
    totalContributed: 45000,
    currentValue: 52300,
    lastUpdated: '2026-06-01',
  },
  {
    id: '2',
    name: 'Roth IRA',
    type: InvestmentType.Retirement,
    totalContributed: 12000,
    currentValue: 14150,
    lastUpdated: '2026-06-01',
  },
  {
    id: '3',
    name: 'High-Yield Savings',
    type: InvestmentType.Savings,
    totalContributed: 8000,
    currentValue: 8240,
    lastUpdated: '2026-06-10',
  },
  {
    id: '4',
    name: 'VTI ETF',
    type: InvestmentType.Stocks,
    symbol: 'VTI',
    totalContributed: 15000,
    currentValue: 18720,
    lastUpdated: '2026-06-14',
  },
  {
    id: '5',
    name: 'AAPL',
    type: InvestmentType.Stocks,
    symbol: 'AAPL',
    totalContributed: 5000,
    currentValue: 6120,
    lastUpdated: '2026-06-14',
  },
];

@Injectable({ providedIn: 'root' })
export class InvestmentService {
  readonly investments = signal<Investment[]>([...SAMPLE_INVESTMENTS]);

  updateInvestment(id: string, updates: Partial<Omit<Investment, 'id'>>): void {
    this.investments.update((list) =>
      list.map((inv) =>
        inv.id === id
          ? { ...inv, ...updates, lastUpdated: new Date().toISOString().slice(0, 10) }
          : inv,
      ),
    );
  }

  addInvestment(investment: Omit<Investment, 'id'>): void {
    const id = crypto.randomUUID();
    this.investments.update((list) => [...list, { ...investment, id }]);
  }
}
