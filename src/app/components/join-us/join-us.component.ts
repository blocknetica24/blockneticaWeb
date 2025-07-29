import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalDatas } from '../../constants/globalDatas';
import { ApiUrls } from '../../constants/apiUrls';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { ValidationMessageComponent } from "../../shared/components/validation-message/validation-message.component";

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
  @ViewChild('successTpl') successTpl!: TemplateRef<any>;
  @ViewChild('dangerTpl') dangerTpl!: TemplateRef<any>;
  joinUsForm!: FormGroup;
  globalDatas = GlobalDatas;
  apiUrls = ApiUrls;
  errorMessage!: string;

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
      avgMonthlyVolume: ['', [Validators.required]],
    });
  }

  onSubmit(){
    if( this.joinUsForm.valid){
      this._apiService
      .callPostMiddleware(this.apiUrls.joinUs,  this.joinUsForm.value)
      .subscribe({
        next: (response: any) => {
          if (response?.ok) {
              this._toastService.show({  template: this.successTpl, classname: 'bg-success text-light', delay: 10000 });
          }else{
            this.errorMessage = 'Failed to send email';
            this._toastService.show({template: this.dangerTpl, classname: 'bg-danger text-light', delay: 15000 });
          }
        },
        error: (error: any) => {
          this.errorMessage = 'Error: ' + error.message;
          this._toastService.show({template: this.dangerTpl, classname: 'bg-danger text-light', delay: 15000 });
        },
      });
    }
  }

}
