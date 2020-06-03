import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

const jwtHelper = new JwtHelperService();
const API = environment.apiFamec;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public login(credencial: Usuario) : Observable<Usuario> {
    return this.http.post<any>(API+'/login', credencial);
  }

  public isLoggedIn(){
    let token = this.getToken();
    return token !== null;
  }

  public isTokenValid(): boolean {
    return this.getToken()!==null && !jwtHelper.isTokenExpired(this.getToken());
  }

  public getToken(): string {
    return localStorage.getItem('FAMEC_ACCESS_TOKEN');
  }

  public setToken(token: string) {
    localStorage.setItem('FAMEC_ACCESS_TOKEN', token);
  }

  public getUser(): Usuario {
    return JSON.parse(localStorage.getItem('usuario'));
  }

  public setUser(user:Usuario) {
    localStorage.setItem('usuario', JSON.stringify(user));
    if(user.token)
      this.setToken(user.token);
  }

  public logout(){
    localStorage.removeItem('FAMEC_ACCESS_TOKEN');
    localStorage.removeItem('usuario');
    this.router.navigateByUrl('');
  }

}
