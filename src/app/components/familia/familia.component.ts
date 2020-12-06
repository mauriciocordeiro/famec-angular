import { Component, OnInit } from '@angular/core';
import { FamiliaService } from 'src/app/services/familia.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { Familia } from 'src/app/model/familia';
import * as moment from 'moment';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent implements OnInit {

  familias: Familia[];

  displayedColumns: string[] = [
    'menu', 'nrProntuario', 'nmAluno', 'dtNascimento', 'nrIdade', 
    'nmEscola', 'tpTurnoFamec', 'dsEndereco','nmBairro', 'nmResponsavel', 'nrTelefone1'
  ];

  turnos = ["", "Matutino", "Vespertino", "Noturno", "Diurno"];

  constructor(private familiaService: FamiliaService, private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.search();
  }

  search(nrProntuario?, nmAluno?, nmResponsavel?) {
    this.familiaService.getAll(nrProntuario, nmAluno, nmResponsavel).subscribe(
      familias => {
        this.familias = familias;
      },
      err => {
        this.familias = [];
        this.snackBar.error(err.error.message);
      }
    )
  }

  getIdade(data) {
    return Math.floor(moment().diff(data, 'years', true));
  }

  getTurno(tpTurno) {
    return this.turnos[tpTurno];
  }

}
