import { Injectable } from '@angular/core';

interface IToast {
  message: string;
  className: string;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: IToast[] = [
    /*{
      message: 'Test Toast',
      className: 'success',
      duration: 5000,
    },
    {
      message: 'Something went wrong',
      className: 'danger',
      duration: 30000,
    },*/
  ];
  constructor() {}

  getToasts() {
    return this.toasts;
  }

  add(toast: IToast) {
    this.toasts.unshift(toast);
  }
  remove(toast: IToast | null) {
    if (toast) {
      this.toasts = this.toasts.filter((t) => t !== toast);
      return;
    }
    this.toasts = [];
  }
}
