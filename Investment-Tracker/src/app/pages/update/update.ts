import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { INVESTMENT_TYPE_LABELS, InvestmentType } from '../../models/investment-type';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-update',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update {
  private readonly investmentService = inject(InvestmentService);

  protected readonly investments = this.investmentService.investments;
  protected readonly typeLabels = INVESTMENT_TYPE_LABELS;
  protected readonly investmentTypes = Object.values(InvestmentType);

  protected selectedId = signal<string | null>(null);

  protected editContributed = signal(0);
  protected editCurrentValue = signal(0);
  protected editNotes = signal('');

  protected newName = signal('');
  protected newType = signal<InvestmentType>(InvestmentType.Stocks);
  protected newContributed = signal(0);
  protected newCurrentValue = signal(0);

  protected onSelect(id: string | null): void {
    this.selectedId.set(id);
    if (!id) {
      return;
    }

    const investment = this.investments().find((inv) => inv.id === id);
    if (!investment) {
      return;
    }

    this.editContributed.set(investment.totalContributed);
    this.editCurrentValue.set(investment.currentValue);
    this.editNotes.set(investment.notes ?? '');
  }

  protected saveChanges(): void {
    const id = this.selectedId();
    if (!id) {
      return;
    }

    this.investmentService.updateInvestment(id, {
      totalContributed: this.editContributed(),
      currentValue: this.editCurrentValue(),
      notes: this.editNotes() || undefined,
    });
  }

  protected addInvestment(): void {
    const name = this.newName().trim();
    if (!name) {
      return;
    }

    this.investmentService.addInvestment({
      name,
      type: this.newType(),
      totalContributed: this.newContributed(),
      currentValue: this.newCurrentValue(),
      lastUpdated: new Date().toISOString().slice(0, 10),
    });

    this.newName.set('');
    this.newContributed.set(0);
    this.newCurrentValue.set(0);
  }
}
