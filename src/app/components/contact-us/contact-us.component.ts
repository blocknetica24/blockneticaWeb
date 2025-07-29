import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalDatas } from '../../constants/globalDatas';
import { ApiService } from '../../services/api.service';
import { ApiUrls } from '../../constants/apiUrls';
import { ValidationMessageComponent } from "../../shared/components/validation-message/validation-message.component";
import { ToastService } from '../../services/toast.service';

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
  @ViewChild('successTpl') successTpl!: TemplateRef<any>;
  @ViewChild('dangerTpl') dangerTpl!: TemplateRef<any>;
  contactUsForm!: FormGroup;
  globalDatas = GlobalDatas;
  apiUrls = ApiUrls;
  errorMessage!: string;

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private toastService: ToastService
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

  onSubmit(){
    if( this.contactUsForm.valid){
      this._apiService
      .callPostMiddleware(this.apiUrls.contactUs,  this.contactUsForm.value)
      .subscribe({
        next: (response: any) => {
          if (response?.ok) {
              this.toastService.show({  template: this.successTpl, classname: 'bg-success text-light', delay: 10000 });
          }else{
            this.errorMessage = 'Failed to send email';
            this.toastService.show({template: this.dangerTpl, classname: 'bg-danger text-light', delay: 15000 });
          }
        },
        error: (error: any) => {
          this.errorMessage = 'Error: ' + error.message;
          this.toastService.show({template: this.dangerTpl, classname: 'bg-danger text-light', delay: 15000 });
        },
      });
    }
  }

}
