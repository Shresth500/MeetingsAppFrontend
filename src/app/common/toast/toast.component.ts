import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { getToastColor } from '../../utils';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, NgbToastModule, JsonPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  public toastService = inject(ToastService);
  getColor(color: string) {
    return getToastColor(color);
  }
}
