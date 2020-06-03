import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatSnackBar } from '@angular/material/snack-bar';
const jwtHelper = new JwtHelperService();

@Injectable()
export class TokenValidatorInterceptor implements HttpInterceptor {

  constructor(private router:Router, private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('/login')) {
      return next.handle(request);
    } else {
      let authReq = request;
      const token = localStorage.getItem('FAMEC_ACCESS_TOKEN');
      if (token != null && !jwtHelper.isTokenExpired(token)) {
        authReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      } else {
        this.snackBar.open('Autorização expirada. Por favor, autentique-se.')
        this.router.navigateByUrl('login');
      }
      return next.handle(authReq);
    }
      
    
  }
}
