import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const ENDPOINT = "https://famec.herokuapp.com/v1";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(credencial) : Observable<any> {
    return this.http.post<any>(ENDPOINT+'/login', credencial);
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('usuario');
  }

  public init() {
    return this.http.post<any>(ENDPOINT+'/init', {});
  }

}
