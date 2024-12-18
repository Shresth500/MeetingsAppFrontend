import { Inject, inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  router = Inject(Router);
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let user = this.authenticationService.getUser();

    // console.log('user = ' + user);
    // console.log('token = ' + user['token']);

    console.log('token = ' + user['authToken']);

    if (user && user['authToken']) {
      request = request.clone({
        setHeaders: {
          // Authorization: `${user['token']}`,
          Authorization: `Bearer ${user['authToken']}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Handle the 403 Forbidden error
          console.log('403 Forbidden: Access Denied');
          this.router.navigate(['/auth/login']);
          // Optionally, redirect the user to the login page
        }

        // Return the error
        return throwError(error);
      })
    );
  }
}
