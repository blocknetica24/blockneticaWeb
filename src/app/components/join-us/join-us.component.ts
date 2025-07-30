import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalDatas } from '../../constants/globalDatas';
import { ApiUrls } from '../../constants/apiUrls';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { ValidationMessageComponent } from "../../shared/components/validation-message/validation-message.component";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ValidationMessageComponent
  ],
  templateUrl: './join-us.component.html',
  styleUrl: './join-us.component.scss'
})
export class JoinUsComponent {
  joinUsForm!: FormGroup;
  globalDatas = GlobalDatas;
  apiUrls = ApiUrls;
  emailSubject = 'Partner With Us Inquiry'

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _toastService: ToastService
  ) {
    this.loadJoinUsForm();
  }


  loadJoinUsForm() {
    this.joinUsForm = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.globalDatas.EMAIL_REG_EXP),
        ],
      ],
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      // avgMonthlyVolume: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.joinUsForm.valid) {
      const params = {
        to: environment.emailId,
        subject: this.emailSubject,
        text: `This is the message from '${this.joinUsForm.value.name}', Comany name is '${this.joinUsForm.value.company}' and his Email is '${this.joinUsForm.value.email}'`
      }
      this._apiService
        .callPostMiddleware(this.apiUrls.joinUs, params)
        .subscribe({
          next: (response: any) => {
            // if (response?.ok) {
            //   this._toastService.show({ message: 'Message sent successfully!', classname: 'bg-success text-light' });
            // } else {
            //   this._toastService.show({ message: 'Failed to send message', classname: 'bg-danger text-light' });
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
