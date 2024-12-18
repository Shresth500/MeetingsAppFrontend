import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkshopListComponent } from '../../workshops/workshop-list/workshop-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [
    NgbAlert,
    NgbAlertModule,
    NgbCollapseModule,
    WorkshopListComponent,
    CommonModule,
  ],
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.scss',
})
export class ErrorAlertComponent {
  @Input() error!: Error | null;
  //constructor() {}
  isOpen = true;
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
