import { Injectable } from '@angular/core';
import { Credencial } from '../interfaces/credencial';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const ENDPOINT = "https://famec.herokuapp.com/api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(credencial: Credencial) : Observable<any> {
    return this.http.post<any>(ENDPOINT+'/login', credencial);
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }

  public init() {
    return this.http.post<any>(ENDPOINT+'/init', {});
  }

}
