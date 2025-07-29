import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationMessages } from '../../../models/validation.model';
import { ValidationMessage } from '../../../constants/validationMessages';

@Component({
  selector: 'app-validation-message',
  standalone: true,
  imports: [],
  templateUrl: './validation-message.component.html',
  styleUrl: './validation-message.component.scss'
})
export class ValidationMessageComponent {
  @Input() control!: AbstractControl | null;
  @Input() formSubmission?: boolean;
  @Input() customErrorMessages?: { [key: string]: string };
  errorMessages: string[] = [];
  private controlSubscription: Subscription | null = null;


  ngOnInit(): void {
    if (this.control) {
      this.controlSubscription = this.control.valueChanges.subscribe(() => {
        this.setErrorMessages();
      });
      this.setErrorMessages();
    }
  }

  ngOnDestroy(): void {
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
    }
  }

  private setErrorMessages(): void {
    if (!this.control?.errors) {
      this.errorMessages = [];
      return;
    }
    const keys = Object.keys(ValidationMessage);
    const controlKeys = Object.keys(this.control.errors) as Array<keyof ValidationMessages>;
    this.errorMessages = controlKeys
      .filter(controlElement => keys.includes(controlElement))
      .map(controlElement => this.customErrorMessages && this.customErrorMessages[controlElement] ? this.customErrorMessages[controlElement] : ValidationMessage[controlElement]);
  }

}
