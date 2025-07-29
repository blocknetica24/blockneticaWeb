import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-toast-template',
  standalone: true,
  imports: [
    NgbToastModule,
    NgTemplateOutlet
  ],
  templateUrl: './toast-template.component.html',
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
  styleUrl: './toast-template.component.scss'
})
export class ToastTemplateComponent {

  constructor(public toastService: ToastService){ }

}
