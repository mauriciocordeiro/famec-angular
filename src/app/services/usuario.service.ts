import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';

const ENDPOINT = environment.apiFamec+'/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor(private http: HttpClient) { }

  public getAll() : Observable<Usuario[]> {
    return this.http.get<any>(ENDPOINT);
  }

  public get(id) : Observable<Usuario> {
    return this.http.get<any>(`${ENDPOINT}/${id}`);
  }

  public save(usuario: Usuario) : Observable<Usuario> {
    if(usuario.cdUsuario) {
      return this.http.put<any>(`${ENDPOINT}/${usuario.cdUsuario}`, usuario);
    } else {
      return this.http.post<any>(`${ENDPOINT}`, usuario);
    }
  }
}
