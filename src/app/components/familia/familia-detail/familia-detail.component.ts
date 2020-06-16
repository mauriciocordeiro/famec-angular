import { Component, OnInit } from '@angular/core';
import { Familia } from 'src/app/model/familia';
import { UserRole } from 'src/app/enum/user-role.enum';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { FamiliaService } from 'src/app/services/familia.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-familia-detail',
  templateUrl: './familia-detail.component.html',
  styleUrls: ['./familia-detail.component.css']
})
export class FamiliaDetailComponent implements OnInit {
  step = 0;

  familia:Familia;

  isAdmin = false;
  userRole = [
    { key: "USER", value: UserRole.USER },
    { key: "ADMIN", value: UserRole.ADMIN }
  ];

  formGroup:FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private familiaService: FamiliaService,
    private snackBar: SnackBarService,
    private authService: AuthService,
    private _adapter: DateAdapter<any>
  ) { }

  ngOnInit(): void {
    this._adapter.setLocale("pt-br");
    
    this.formGroup = this.buildFormGroup(new Familia());
    this.loadFamilia();
  }

  loadFamilia() {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.familiaService.get(params.get('id'))
        .subscribe(
          familia => {
            this.familia = familia;
            this.formGroup = this.buildFormGroup(this.familia);
            console.log(familia)
          },
          err => {
            let error = err.error;
            this.snackBar.error(error.message, error.status);
          }
        );
      }
    });
  }

  onChangeEstudando(event) {
    this.lgResponsavelEstudando = event.checked;
  }

  onChangeSituacaoHabitacional(event) {
    this.lgHabitacaoAluguel = event.value === 2; //Alugada
  }


  buildFormGroup(familia: Familia): FormGroup {
    return new FormGroup({
      cdFamilia: new FormControl(familia.cdFamilia),
      dtCadastro: new FormControl(familia.dtCadastro),
      nrProntuario: new FormControl(familia.nrProntuario),
      cdUsuarioCadastro: new FormControl(familia.cdUsuarioCadastro),

      cdResponsavel: new FormControl(familia.responsavel.cdResponsavel),
      nmResponsavel: new FormControl(familia.responsavel.nmResponsavel),
      tpParentesco: new FormControl(familia.responsavel.tpParentesco),
      tpGenero: new FormControl(familia.responsavel.tpGenero),
      dtNascimento: new FormControl(familia.responsavel.dtNascimento),
      nmNaturalidade: new FormControl(familia.responsavel.nmNaturalidade),
      tpEstadoCivil: new FormControl(familia.responsavel.tpEstadoCivil),
      nrTelefone1: new FormControl(familia.responsavel.nrTelefone1),
      nrTelefone2: new FormControl(familia.responsavel.nrTelefone2),
      nrRg: new FormControl(familia.responsavel.nrRg),
      nmOrgaoExpedidorRg: new FormControl(familia.responsavel.nmOrgaoExpedidorRg),
      sgUfRg: new FormControl(familia.responsavel.sgUfRg),
      nrCpf: new FormControl(familia.responsavel.nrCpf),
      dsEscolaridade: new FormControl(familia.responsavel.dsEsclaridade),
      lgEstudante: new FormControl(familia.responsavel.lgEstudante),
      tpNivelEscolar: new FormControl(familia.responsavel.tpNivelEscolar),
      tpTurno: new FormControl(familia.responsavel.tpTurno),
      nmOcupacao: new FormControl(familia.responsavel.nmOcupacao),
      vlRendaMensal: new FormControl(familia.responsavel.vlRendaMensal),
      nmLocalTrabalho: new FormControl(familia.responsavel.nmLocalTrabalho),
      nrTelefoneTrabalho: new FormControl(familia.responsavel.nrTelefoneTrabalho),

      cdEnderecoResponsavel: new FormControl(familia.responsavel.enderecoResponsavel.cdEnderecoResponsavel),
      nmRua: new FormControl(familia.responsavel.enderecoResponsavel.nmRua),
      nrCasa: new FormControl(familia.responsavel.enderecoResponsavel.nrCasa),
      nmComplemento: new FormControl(familia.responsavel.enderecoResponsavel.nmComplemento),
      nmBairro: new FormControl(familia.responsavel.enderecoResponsavel.nmBairro),
      nmCidade: new FormControl(familia.responsavel.enderecoResponsavel.nmCidade),
      nmEstado: new FormControl(familia.responsavel.enderecoResponsavel.nmEstado),
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  lgHabitacaoAluguel: boolean = false;
  lgResponsavelEstudando: boolean = false;

  parentesco = [
    { id: 1, label: 'MÃE/PAI' },
    { id: 2, label: 'AVÓ/AVÔ' },
    { id: 3, label: 'IRMÃ/IRMÃO' },
    { id: 4, label: 'TIA/TIO' },
    { id: 5, label: 'OUTRO' }
  ];

  estadoCivil = [
    { id: 1, label: 'SOLTEIRO' },
    { id: 1, label: 'CASADO' },
    { id: 1, label: 'SEPARADO' },
    { id: 1, label: 'DICORCIADO' },
    { id: 1, label: 'VIÚVO' }
  ];

  nivelEscolaridade = [
    { id: 1, label: 'FUNDAMENTAL' },
    { id: 2, label: 'MÉDIO' },
    { id: 3, label: 'SUPERIOR' },
    { id: 4, label: 'OUTRO' }
  ];

  horarioEscolar = [
    { id: 1, label: 'MATUTINO' },
    { id: 2, label: 'VESPERTINO' },
    { id: 3, label: 'NOTURNO' },
    { id: 4, label: 'DIURNO' }
  ];

  situacaoHabitacional = [
    { id: 1, label: 'PRÓPRIA' },
    { id: 2, label: 'ALUGADA' },
    { id: 3, label: 'CEDIDA' },
    { id: 4, label: 'INVASÃO' },
    { id: 5, label: 'DE FAVOR' }
  ];

  abastecimentoAgua = [
    { id: 1, label: 'REDE PÚBLICA' }
  ];

  tratamentoAgua = [
    { id: 1, label: 'FILTRAÇÃO' },
    { id: 2, label: 'FERVURA' },
    { id: 3, label: 'S/ TRATAMENTO' },
    { id: 4, label: 'OUTROS' }
  ];

  iluminacao = [
    { id: 1, label: 'MEDIDOR PRÓXIMO' },
    { id: 2, label: 'S/ MEDIDOR' },
    { id: 3, label: 'OUTROS' }
  ];

  escoamentoSanitario = [
    { id: 1, label: 'ESGOTO' },
    { id: 2, label: 'FOSSA' },
    { id: 3, label: 'CÉU ABERTO' },
    { id: 4, label: 'OUTROS' }
  ];

  destinoLixo = [
    { id: 1, label: 'COLETADO' },
    { id: 2, label: 'QUEIMADO' },
    { id: 3, label: 'ENTERRADO' },
    { id: 4, label: 'CÉU ABERTO' },
    { id: 5, label: 'OUTROS' }
  ];

  sgUf = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];


  sexo = [
    { id: 1, label: 'MASCULINO' },
    { id: 2, label: 'FEMININO' }
  ];

}
