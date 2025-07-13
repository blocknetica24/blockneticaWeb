import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessageComponent } from "../../shared/components/validation-message/validation-message.component";
import { NumberOnlyDirective } from '../../directive/number-only.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-much-save',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    ValidationMessageComponent,
    NumberOnlyDirective,
    CommonModule
  ],
  templateUrl: './how-much-save.component.html',
  styleUrl: './how-much-save.component.scss'
})
export class HowMuchSaveComponent {
  amountControl = new FormControl('', [Validators.required]);
  otherMerchantCost = 0;
  blockneticaCost = 0;
  savedAmount = 0;
  
  constructor( ) { }
  
  calculateProfit() {
    if(this.amountControl.valid){
      const amount = parseFloat(this.amountControl.value || '0');
      this.otherMerchantCost = amount - ((amount * 2.5)/100);
      this.blockneticaCost = amount -  ((amount * 0.8)/100);
      this.savedAmount = this.blockneticaCost - this.otherMerchantCost;
    }
  }

}
