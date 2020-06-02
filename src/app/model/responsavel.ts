import { EnderecoResponsavel } from './endereco-responsavel';

export class Responsavel {
    cdResponsavel:number;
    cdFamilia:number;
    nmResponsavel:string;
    tpParentesco:number;
    tpGenero:number;
    dtNascimento:Date;
    nmNaturalidade:string;
    tpEstadoCivil:number;
    nrTelefone1:string;
    nrTelefone2:string;
    nrRg:string;
    nmOrgaoExpedidorRg:string;
    sgUfRg:string;
    nrCpf:string;
    dsEsclaridade:string;
    lgEstudante:number;
    tpNivelEscolar:number;
    tpTurno:number;
    nmOcupacao:string;
    vlRendaMensal:number;
    nmLocalTrabalho:string;
    nrTelefoneTrabalho:string;

    enderecoResponsavel:EnderecoResponsavel;
}