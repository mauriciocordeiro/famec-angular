import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';

const API = environment.apiFamec;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  headers = { 
    "Authorization": "Bearer " + localStorage.getItem('FAMEC_ACCESS_TOKEN') 
  }

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Usuario[]> {
    return this.http.get<any>(API+'/usuarios');
  }
}
