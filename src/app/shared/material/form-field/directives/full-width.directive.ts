import { booleanAttribute, Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFullWidth]',
})
export class FullWidthDirective {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer2 = inject(Renderer2);

  applyFullWith = input(true, { transform: booleanAttribute, alias: 'appFullWidth' });

  constructor() {
    effect(() => {
      if(this.applyFullWith()) {
        this.renderer2.setStyle(this.elementRef.nativeElement, 'width', '100%');
      }
    })
  }
}
