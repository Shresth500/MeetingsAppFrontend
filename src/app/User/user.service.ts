import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IUser {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `https://localhost:7181/api/User/User`;
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get<IUser[]>(`${this.apiUrl}`);
  }
}
