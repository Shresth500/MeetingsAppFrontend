import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import { AuthService, ILogin } from '../../common/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loading = false;
  returnUrl!: string;
  credentials!: ILogin;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isloggedin()) {
      this.router.navigateByUrl('/home');
    }
  }

  login(form: NgForm) {
    this.credentials = { ...form.value };
    console.log(this.credentials);
    this.authService.login(this.credentials).subscribe({
      next: (loginResponse) => {
        console.log('success');
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        alert(`Either Email or password is incorrect`);
      },
    });
  }
}
