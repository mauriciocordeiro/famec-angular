import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Familia } from '../model/familia';
import { HttpClient, HttpParams } from '@angular/common/http';

const ENDPOINT = environment.apiFamec+'/familias';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {
  constructor(private http: HttpClient) { }

  public getAll(nrProntuario?, nmAluno?, nmResponsavel?) : Observable<Familia[]> {
    let queryParams = new HttpParams();

    if(nrProntuario)
      queryParams = queryParams.append("prontuario", nrProntuario);
    if(nmAluno)
      queryParams = queryParams.append("aluno", nmAluno);
    if(nmResponsavel)
      queryParams = queryParams.append("responsavel", nmResponsavel);

    return this.http.get<any>(ENDPOINT, { params: queryParams });
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
