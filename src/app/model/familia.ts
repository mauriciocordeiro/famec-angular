import { Aluno } from './aluno';
import { Responsavel } from './responsavel';
import { Habitacao } from './habitacao';
import { PerfilSocial } from './perfil-social';

export class Familia {
    cdFamilia:number;
    dtCadastro:number;
    cdUsuarioCadastro:number;
    nrProntuario:string;

    alunos:Aluno[];
    responsavel:Responsavel;
    habitacao:Habitacao;
    perfilSocial:PerfilSocial;
}