import { Component, OnInit } from '@angular/core';
import { Familia } from 'src/app/model/familia';
import { UserRole } from 'src/app/enum/user-role.enum';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { FamiliaService } from 'src/app/services/familia.service';
import { DateAdapter } from '@angular/material/core';
import { Aluno } from 'src/app/model/aluno';
import { Situacao } from 'src/app/enum/situacao.enum';

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

  addAluno() {
    this.formGroup.value.alunos.push(this.buildAlunoFormGroup(new Aluno()));
  }

  delAluno(index) {
    this.formGroup.value.alunos.splice(index, 1);
  }

  onSubmit() {
    if(this.formGroup.invalid) {
      this.snackBar.alert('Existem campos inválidos');
      return;
    }

    let familia: Familia = this.buildObject(this.formGroup);

    this.familiaService.save(familia)
      .subscribe(
        familia => {
          this.snackBar.success('Salvo com sucesso');
          this.familia = familia;
          this.formGroup = this.buildFormGroup(this.familia);
        },
        err => {
          let error = err.error || { status: err.status, message: "Erro!"};
          this.snackBar.error(error.message, error.status);
        }
      )
  }

  buildObject(formGroup: FormGroup): Familia {
    let familia = new Familia();
    let form = formGroup.getRawValue();

    // familia
    familia.cdFamilia = form.cdFamilia;
    familia.cdUsuarioCadastro = this.authService.getUser().cdUsuario;
    familia.dtCadastro = (form.dtCadastro || new Date());
    familia.nrProntuario = form.nrProntuario;
    debugger
    
    // responsavel
    familia.responsavel.cdResponsavel = form.cdResponsavel;
    familia.responsavel.nmResponsavel = form.nmResponsavel;
    familia.responsavel.tpParentesco = form.tpParentesco;
    familia.responsavel.tpGenero = form.tpGenero;
    familia.responsavel.dtNascimento = form.dtNascimento 
    familia.responsavel.nmNaturalidade = form.nmNaturalidade
    familia.responsavel.tpEstadoCivil = form.tpEstadoCivil
    familia.responsavel.nrTelefone1 = form.nrTelefone1
    familia.responsavel.nrTelefone2 = form.nrTelefone2
    familia.responsavel.nrRg = form.nrRg
    familia.responsavel.nmOrgaoExpedidorRg = form.nmOrgaoExpedidorRg
    familia.responsavel.sgUfRg = form.sgUfRg
    familia.responsavel.nrCpf = form.nrCpf;
    familia.responsavel.dsEscolaridade = form.dsEscolaridade;
    familia.responsavel.lgEstudante = (form.lgEstudante ? 1 : 0);
    familia.responsavel.tpNivelEscolar = form.tpNivelEscolar;
    familia.responsavel.tpTurno = form.tpTurno;
    familia.responsavel.nmOcupacao = form.nmOcupacao;
    familia.responsavel.vlRendaMensal = form.vlRendaMensal;
    familia.responsavel.nmLocalTrabalho  = form.nmLocalTrabalho;
    familia.responsavel.nrTelefoneTrabalho = form.nrTelefoneTrabalho;
    debugger

    // endereco
    familia.responsavel.enderecoResponsavel.cdEnderecoResponsavel = form.cdEnderecoResponsavel;
    familia.responsavel.enderecoResponsavel.nmRua = form.nmRua;
    familia.responsavel.enderecoResponsavel.nrCasa = form.nrCasa;
    familia.responsavel.enderecoResponsavel.nmComplemento = form.nmComplemento;
    familia.responsavel.enderecoResponsavel.nmBairro = form.nmBairro;
    familia.responsavel.enderecoResponsavel.nmCidade = form.nmCidade;
    familia.responsavel.enderecoResponsavel.nmEstado = form.nmEstado;
    debugger

    // perfil social
    familia.perfilSocial.cdPerfilSocial = form.cdPerfilSocial;
    familia.perfilSocial.lgNis = (form.lgNis ? 1 : 0);
    familia.perfilSocial.nrNis = form.nrNis;
    familia.perfilSocial.lgBeneficio = (form.lgBeneficio ? 1 : 0);
    familia.perfilSocial.nmBeneficio = form.nmBeneficio;
    familia.perfilSocial.vlBeneficio = form.vlBeneficio;    
    debugger

    // habitacao
    familia.habitacao.cdHabitacao = form.cdHabitacao;
    familia.habitacao.tpSituacao = form.tpSituacao;
    familia.habitacao.vlAluguel = form.vlAluguel;
    familia.habitacao.nrComodos = form.nrComodos;
    familia.habitacao.tpAbastecimento = form.tpAbastecimento;
    familia.habitacao.tpTratamentoAgua = form.tpTratamentoAgua;
    familia.habitacao.tpIluminacao = form.tpIluminacao;
    familia.habitacao.tpEscoamentoSanitario = form.tpEscoamentoSanitario;
    familia.habitacao.tpDestinoLixo = form.tpDestinoLixo;
    debugger

    // alunos
    form.alunos.forEach(formAluno => {
      let aluno: Aluno = formAluno.getRawValue();
      aluno.stAluno = (aluno.stAluno ? Situacao.ATIVO : Situacao.INATIVO);
      aluno.lgAcompanhanteSaida = (aluno.lgAcompanhanteSaida ? 1 : 0);
      aluno.lgAlmocoInstituicao = (aluno.lgAlmocoInstituicao ? 1 : 0);

      familia.alunos.push(aluno);
    });
    debugger

    return familia;
  }

  buildFormGroup(familia: Familia): FormGroup {
    let form =  new FormGroup({
      cdFamilia: new FormControl(familia.cdFamilia),
      dtCadastro: new FormControl(familia.dtCadastro),
      nrProntuario: new FormControl(familia.nrProntuario, Validators.required),
      cdUsuarioCadastro: new FormControl(familia.cdUsuarioCadastro),

      cdResponsavel: new FormControl(familia.responsavel.cdResponsavel),
      nmResponsavel: new FormControl(familia.responsavel.nmResponsavel, Validators.required),
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
      nrCpf: new FormControl(familia.responsavel.nrCpf, Validators.required),
      dsEscolaridade: new FormControl(familia.responsavel.dsEscolaridade),
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

      cdPerfilSocial: new FormControl(familia.perfilSocial.cdPerfilSocial),
      lgNis: new FormControl(familia.perfilSocial.lgNis),
      nrNis: new FormControl(familia.perfilSocial.nrNis),
      lgBeneficio: new FormControl(familia.perfilSocial.lgBeneficio),
      nmBeneficio: new FormControl(familia.perfilSocial.nmBeneficio),
      vlBeneficio: new FormControl(familia.perfilSocial.vlBeneficio),

      cdHabitacao: new FormControl(familia.habitacao.cdHabitacao),
      tpSituacao: new FormControl(familia.habitacao.tpSituacao),
      vlAluguel: new FormControl(familia.habitacao.vlAluguel),
      nrComodos: new FormControl(familia.habitacao.nrComodos),
      tpAbastecimento: new FormControl(familia.habitacao.tpAbastecimento),
      tpTratamentoAgua: new FormControl(familia.habitacao.tpTratamentoAgua),
      tpIluminacao: new FormControl(familia.habitacao.tpIluminacao),
      tpEscoamentoSanitario: new FormControl(familia.habitacao.tpEscoamentoSanitario),
      tpDestinoLixo: new FormControl(familia.habitacao.tpDestinoLixo),

      alunos: new FormControl([])
    });

    familia.alunos.forEach(aluno => {
      form.value.alunos.push(this.buildAlunoFormGroup(aluno));
    });

    return form;
  }

  buildAlunoFormArray(alunos: Aluno[]): FormArray {
    let array = new FormArray([]);
    alunos.forEach(aluno => {
      array.push(this.buildAlunoFormGroup(aluno));
    });
    return array;
  }

  buildAlunoFormGroup(aluno: Aluno) : FormGroup {
    return new FormGroup({
      cdAluno: new FormControl(aluno.cdAluno),
      cdFamilia: new FormControl(aluno.cdFamilia),
      nmAluno: new FormControl(aluno.nmAluno, Validators.required),
      dtNascimento: new FormControl(aluno.dtNascimento, Validators.required),
      tpSexo: new FormControl(aluno.tpSexo),
      nmNaturalidade: new FormControl(aluno.nmNaturalidade),
      nmEscola: new FormControl(aluno.nmEscola),
      nrNivelEscolar: new FormControl(aluno.nrNivelEscolar),
      tpModalidadeEscolar: new FormControl(aluno.tpModalidadeEscolar),
      tpHorarioEscolar: new FormControl(aluno.tpHorarioEscolar),
      tpTurnoFamec: new FormControl(aluno.tpTurnoFamec),
      stAluno: new FormControl(aluno.stAluno),
      hrSaida: new FormControl(aluno.hrSaida),
      lgAcompanhanteSaida: new FormControl(aluno.lgAcompanhanteSaida),
      nmAcompanhanteSaida: new FormControl(aluno.nmAcompanhanteSaida),
      lgAlmocoInstituicao: new FormControl(aluno.lgAlmocoInstituicao),
      dsHrSaida: new FormControl(aluno.dsHrSaida)
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
