import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    title: 'Workshop Details',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signin',
        component: SigninComponent,
      },
    ],
  },
];
