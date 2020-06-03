import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

const API = environment.apiFamec;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(credencial: Usuario) : Observable<Usuario> {
    return this.http.post<any>(API+'/login', credencial);
  }

  public isLoggedIn(){
    return localStorage.getItem('FAMEC_ACCESS_TOKEN') !== null;
  }

  public logout(){
    localStorage.removeItem('FAMEC_ACCESS_TOKEN');
    localStorage.removeItem('usuario');
  }

}
