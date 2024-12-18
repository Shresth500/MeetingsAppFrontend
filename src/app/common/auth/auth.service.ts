import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignin {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'auth';
  private apiUrl = `https://localhost:7181`;
  constructor(private http: HttpClient) {}
  signin(credentials: ISignin) {
    return this.http.post<ISignin>(
      `${this.apiUrl}/api/auth/register/`,
      credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  login(credentials: ILogin) {
    return this.http
      .post<ILogin>(`${this.apiUrl}/api/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((loginResponse) => {
          localStorage.setItem(this.AUTH_KEY, JSON.stringify(loginResponse));
          console.log(localStorage);
        })
      );
  }
  logout() {
    localStorage.removeItem(this.AUTH_KEY);
  }
  getUser() {
    const authStr = localStorage.getItem(this.AUTH_KEY);
    if (!authStr) return '';
    return JSON.parse(authStr);
  }
  getToken() {
    const authStr = localStorage.getItem(this.AUTH_KEY);
    if (!authStr) return '';
    let value = JSON.parse(authStr);
    return value['token'];
  }
  isloggedin() {
    const authStr = localStorage.getItem(this.AUTH_KEY);

    if (!authStr) return false;
    return true;
  }
}
