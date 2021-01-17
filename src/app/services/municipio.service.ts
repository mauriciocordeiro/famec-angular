import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../core/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private list = []

  constructor(
    private http: HttpClient,
    private loader: LoaderService
  ) { }

  private async init() {
    this.loader.show()
    this.list = []
    this.http
      .get<any>('https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome')
      .subscribe(data => {
        data.forEach(item => {
          let n:string = `${item.nome} - ${item.microrregiao.mesorregiao.UF.sigla}`
          this.list.push(n.toUpperCase())
        });
        this.loader.hide()
      });
  }  

  filter(nome: string): any[] {
    return this.list.filter(option => option.includes(nome));
  }

  async getAll() {
    if(this.list.length === 0)
      await this.init();

    return this.list;
  }

}
