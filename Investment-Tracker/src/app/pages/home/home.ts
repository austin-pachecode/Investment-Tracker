import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

import {
  computeGainLoss,
  computeGainLossPercent,
  computePortfolioSummary,
} from '../../models/investment';
import { INVESTMENT_TYPE_LABELS } from '../../models/investment-type';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly investmentService = inject(InvestmentService);

  protected readonly investments = this.investmentService.investments;
  protected readonly summary = computed(() =>
    computePortfolioSummary(this.investments()),
  );
  protected readonly typeLabels = INVESTMENT_TYPE_LABELS;

  protected maxChartValue = computed(() => {
    const investments = this.investments();
    if (investments.length === 0) {
      return 1;
    }
    return Math.max(
      ...investments.flatMap((i) => [i.totalContributed, i.currentValue]),
    );
  });

  protected contributedBarWidth(investment: { totalContributed: number }): number {
    return (investment.totalContributed / this.maxChartValue()) * 100;
  }

  protected currentBarWidth(investment: { currentValue: number }): number {
    return (investment.currentValue / this.maxChartValue()) * 100;
  }

  protected gainLoss(investment: Parameters<typeof computeGainLoss>[0]): number {
    return computeGainLoss(investment);
  }

  protected gainLossPercent(
    investment: Parameters<typeof computeGainLossPercent>[0],
  ): number {
    return computeGainLossPercent(investment);
  }
}
