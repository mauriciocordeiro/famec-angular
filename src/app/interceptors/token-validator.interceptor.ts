import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenValidatorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar, private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/login')) {
      return next.handle(request);
    } else {
      let authReq = request;
      if (this.authService.isTokenValid()) {
        authReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + this.authService.getToken()) });
      } else {
        this.snackBar.open('Autorização expirada. Por favor, autentique-se.', 'OK', { duration: 2000 });
        this.authService.logout();
      }
      return next.handle(authReq);
    }
  }
}
