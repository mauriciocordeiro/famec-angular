import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aluno-detail',
  templateUrl: './aluno-detail.component.html',
  styleUrls: ['./aluno-detail.component.css']
})
export class AlunoDetailComponent implements OnInit {

  @Input('formGroup') formGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
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

}
