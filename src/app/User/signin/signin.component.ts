import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import { AuthService, ISignin } from '../../common/auth/auth.service';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  loading = false;
  returnUrl!: string;
  credentials!: ISignin;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  sigin(form: NgForm) {
    this.credentials = { ...form.value };
    console.log(this.credentials);
    // this.credentials.username = form.value.name;
    console.log(this.credentials);
    this.auth.signin(this.credentials).subscribe({
      next: (registered) => {
        this.router.navigate(['/auth', 'login']);
      },
    });
  }
}
