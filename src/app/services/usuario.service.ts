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
  
  constructor(private http: HttpClient) { }

  public getAll() : Observable<Usuario[]> {
    return this.http.get<any>(API+'/usuarios');
  }

  public get(id) : Observable<Usuario> {
    return this.http.get<any>(`${API}/usuarios/${id}`);
  }

  public save(usuario: Usuario) : Observable<Usuario> {
    if(usuario.cdUsuario) {
      return this.http.put<any>(`${API}/usuarios/${usuario.cdUsuario}`, usuario);
    } else {
      return this.http.post<any>(`${API}/usuarios`, usuario);
    }
  }
}
