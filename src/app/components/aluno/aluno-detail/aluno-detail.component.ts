import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Situacao } from 'src/app/enum/situacao.enum';
import { EscolaService } from 'src/app/services/escola.service';
import { MunicipioService } from 'src/app/services/municipio.service';

@Component({
  selector: 'app-aluno-detail',
  templateUrl: './aluno-detail.component.html',
  styleUrls: ['./aluno-detail.component.css']
})
export class AlunoDetailComponent implements OnInit {

  @Input('formGroup') formGroup: FormGroup;

  
  municipios: string[];
  filteredMunicipios: Observable<string[]>;

  escolas: string[];
  filteredEscolas: Observable<string[]>;

  constructor(
    private municipioService: MunicipioService,
    private escolaService: EscolaService,
    private loaderService: LoaderService
  ) { }

  async ngOnInit() {
    this.loaderService.show();
    
    this.municipios = await this.municipioService.getAll();
    this.filteredMunicipios = this.formGroup.get('nmNaturalidade').valueChanges.pipe(
      startWith(''),
      map(value => this.municipioService.filter(value))
    );

    this.escolas = await this.escolaService.getAll();
    this.filteredEscolas = this.formGroup.get('nmEscola').valueChanges.pipe(
      startWith(''),
      map(value => this.escolaService.filter(value))
    );

    
    this.loaderService.hide();
  }


  nivelEscolar = [
    { id: 1, label: '1º' }, { id: 2, label: '2º' }, { id: 3, label: '3º' },
    { id: 4, label: '4º' }, { id: 5, label: '5º' }, { id: 6, label: '6º' },
    { id: 7, label: '7º' }, { id: 8, label: '8º' }, { id: 9, label: '9º' }
  ];

  modalidadeEscolar = [
    { id: 1, label: 'INFANTIL' },
    { id: 2, label: 'FUNDAMENTAL' },
    { id: 3, label: 'MÉDIO' }
  ];

  horarioEscolar = [
    { id: 1, label: 'MATUTINO' },
    { id: 2, label: 'VESPERTINO' },
    { id: 3, label: 'NOTURNO' },
    { id: 4, label: 'DIURNO' }
  ];

  horarioInstituicao = [
    { id: 1, label: 'MATUTINO' },
    { id: 2, label: 'VESPERTINO' },
    { id: 3, label: 'NOTURNO' },
    { id: 4, label: 'DIURNO' }
  ];

  sexo = [
    { id: 1, label: 'MASCULINO' },
    { id: 2, label: 'FEMININO' }
  ];
  
  situacoes = [
    { key: "ATIVO", value: Situacao.ATIVO },
    { key: "INATIVO", value: Situacao.INATIVO }
  ];

}
