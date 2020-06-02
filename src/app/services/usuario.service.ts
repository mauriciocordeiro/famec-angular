import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';

const API = environment.apiFamec;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  headers = { 
    "Authorization": "Bearer " + localStorage.getItem('ACCESS_TOKEN') 
  }

  constructor(private http: HttpClient) { }

  public async getAll() : Promise<Usuario[]> {
    return await this.http.get<any>(API+'/usuarios', { headers: this.headers }).toPromise();
  }
}
