import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Familia } from '../model/familia';
import { HttpClient } from '@angular/common/http';

const ENDPOINT = environment.apiFamec+'/familias';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {
  constructor(private http: HttpClient) { }

  public getAll() : Observable<Familia[]> {
    return this.http.get<any>(ENDPOINT);
  }

  public get(id) : Observable<Familia> {
    return this.http.get<any>(`${ENDPOINT}/${id}`);
  }

  public save(familia: Familia) : Observable<Familia> {
    if(familia.cdFamilia) {
      return this.http.put<any>(`${ENDPOINT}/${familia.cdFamilia}`, familia);
    } else {
      return this.http.post<any>(`${ENDPOINT}`, familia);
    }
  }

  public getMatriculas(id) : Observable<any> {
    return this.http.get<any>(`${ENDPOINT}/${id}/matriculas`);
  }
}
