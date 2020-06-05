import { Component, OnInit, Pipe, PipeTransform, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRole } from 'src/app/enum/user-role.enum';
import { Situacao } from 'src/app/enum/situacao.enum';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css'],
  
})
export class UsuarioDetailComponent implements OnInit {

  usuario: Usuario;

  userRole = [
    { key: "USER", value: UserRole.USER },
    { key: "ADMIN", value: UserRole.ADMIN }
  ];

  formGroup:FormGroup;

  @ViewChild('nmSenhaConfirm') nmSenhaConfirm: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formGroup = this.buildFormGroup(new Usuario());

    this.loadUsuario();
  }

  loadUsuario() {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.usuarioService.get(params.get('id'))
        .subscribe(
          usuario => {
            this.usuario = usuario;
            this.formGroup = this.buildFormGroup(this.usuario);
          },
          err => {
            let error = err.error;
            this.snackBar.open(error.message, error.status, { duration: 2000 });
          }
        );
      }
    });
  }

  onSubmit() {
    if(this.formGroup.invalid) {
      this.snackBar.open("Existem campos inválidos.", "OK", { duration: 2000 });
      return;
    }

    if(this.formGroup.getRawValue().nmSenha != this.nmSenhaConfirm.nativeElement.value) {
      this.snackBar.open("A senha não confere.", "OK", { duration: 2000 });
      return;
    }

    this.usuarioService.save(this.formGroup.getRawValue()).subscribe(
      usuario => {
        this.usuario = usuario;
        this.formGroup = this.buildFormGroup(this.usuario);
        this.snackBar.open("Salvo com sucesso.", "OK", { duration: 2000 });
      }, err => {
        let error = err.error;
        this.snackBar.open(error.message, error.status, { duration: 2000 });
      }
    );

  }

  buildFormGroup(usuario: Usuario) {
    return new FormGroup({
        cdUsuario: new FormControl(usuario.cdUsuario),
        nmUsuario: new FormControl(usuario.nmUsuario, [Validators.required]),
        stUsuario: new FormControl(usuario.stUsuario || Situacao.ATIVO),
        nmLogin: new FormControl(usuario.nmLogin, [Validators.required]),
        nmSenha: new FormControl(usuario.nmSenha, [Validators.required]),
        nmEmail: new FormControl(usuario.nmEmail),
        nmFuncao: new FormControl(usuario.nmFuncao),
        nmRole: new FormControl(usuario.nmRole || UserRole.USER, [Validators.required]),
        token: new FormControl(usuario.token)
    });
}

}
