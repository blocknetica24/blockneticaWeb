import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalDatas } from '../../constants/globalDatas';
import { ApiService } from '../../services/api.service';
import { ApiUrls } from '../../constants/apiUrls';
import { ValidationMessageComponent } from "../../shared/components/validation-message/validation-message.component";
import { ToastService } from '../../services/toast.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ValidationMessageComponent
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  contactUsForm!: FormGroup;
  globalDatas = GlobalDatas;
  apiUrls = ApiUrls;
  emailSubject = 'Contact Us Message'

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _toastService: ToastService
  ) {
    this.loadContactUsForm();
  }


  loadContactUsForm() {
    this.contactUsForm = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.globalDatas.EMAIL_REG_EXP),
        ],
      ],
      name: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.contactUsForm.valid) {
      const params = {
        to: environment.emailId,
        subject: this.emailSubject,
        text: `This is the message from '${this.contactUsForm.value.name}' and his email is '${this.contactUsForm.value.email}' his message is '${this.contactUsForm.value.message}'`
      }
      this._apiService
        .callPostMiddleware(this.apiUrls.contactUs, params)
        .subscribe({
          next: (response: any) => {
            // if (response?.ok) {
            //   this.toastService.show({ message: 'Message sent successfully!', classname: 'bg-success text-light' });
            // } else {
            //   this.toastService.show({ message: 'Failed to send message', classname: 'bg-danger text-light' });
            // }
            this._toastService.show({ message: 'Message sent successfully!', classname: 'bg-success text-light' });
          },
          error: (error: any) => {
            error.error.error ?
              this._toastService.show({ message: 'Error: ' + error?.error?.error, classname: 'bg-danger text-light' }) :
              this._toastService.show({ message: 'Failed to send message', classname: 'bg-danger text-light' });
          },
        });
    }
  }

}
