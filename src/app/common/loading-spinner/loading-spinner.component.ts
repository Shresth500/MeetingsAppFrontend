import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getColor } from '../../utils';
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
})
export class LoadingSpinnerComponent {
  @Input() variant: string = '';
  SpinnerChange() {
    return getColor(this.variant);
  }
}
