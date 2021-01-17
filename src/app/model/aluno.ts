import { Escola } from "./escola";

export class Aluno {

  cdAluno:number;
  cdFamilia:number;
  nmAluno:string;
  dtNascimento:Date;
  tpSexo:number;
  nmNaturalidade:string;
  nmEscola:string;
  nrNivelEscolar:number;
  tpModalidadeEscolar:number;
  tpHorarioEscolar:number;
  tpTurnoFamec:number;
  stAluno:number;
  hrSaida:any;
  lgAcompanhanteSaida:number;
  nmAcompanhanteSaida:string;
  lgAlmocoInstituicao:number;
  dsHrSaida:string;
  escola:Escola;

  constructor() {
    this.escola = new Escola();
  }
}