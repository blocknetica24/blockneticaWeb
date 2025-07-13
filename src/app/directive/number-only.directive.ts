import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
  standalone: true
})
export class NumberOnlyDirective {

 @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleanedValue = input.value.replace(/[^0-9]/g, '');
    if (input.value !== cleanedValue) {
      input.value = cleanedValue;
      input.dispatchEvent(new Event('input'));
    }
  }

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent): void {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

}
