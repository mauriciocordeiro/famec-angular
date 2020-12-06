import { Aluno } from './aluno';
import { Responsavel } from './responsavel';
import { Habitacao } from './habitacao';
import { PerfilSocial } from './perfil-social';

export class Familia {
    cdFamilia:number;
    dtCadastro:Date;
    cdUsuarioCadastro:number;
    nrProntuario:string;

    alunos:Array<Aluno>;
    responsavel:Responsavel;
    habitacao:Habitacao;
    perfilSocial:PerfilSocial;

    constructor() {
        this.responsavel = new Responsavel();
        this.habitacao = new Habitacao();
        this.perfilSocial = new PerfilSocial();
        this.alunos = new Array<Aluno>();
    }
}