import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TransactionType } from '@shared/transaction/enums/transaction-types';

@Directive({
  selector: '[isIncome]',
})
export class IsIncomeDirective {
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainer = inject(ViewContainerRef);

  transactionType = input.required<TransactionType>({ alias: 'isIncome' });

  elseTemplate = input<TemplateRef<unknown>>(undefined, { alias: 'isIncomeElse' });

  constructor() {
    effect(() => {
      if (this.transactionType() === TransactionType.INCOME) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        if (this.elseTemplate()) {
          this.viewContainer.createEmbeddedView(this.elseTemplate()!);
        } else {
          this.viewContainer.clear();
        }
      }
    });
  }
}
