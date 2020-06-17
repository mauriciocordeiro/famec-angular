import { Component, OnInit, Pipe, PipeTransform, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRole } from 'src/app/enum/user-role.enum';
import { Situacao } from 'src/app/enum/situacao.enum';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css'],
  
})
export class UsuarioDetailComponent implements OnInit {
  isAdmin = false;
  usuario: Usuario;

  userRole = [
    { key: "USER", value: UserRole.USER },
    { key: "ADMIN", value: UserRole.ADMIN }
  ];

  situacoes = [
    { key: "ATIVO", value: Situacao.ATIVO},
    { key: "INATIVO", value: Situacao.INATIVO}
  ];

  formGroup:FormGroup;

  @ViewChild('nmSenhaConfirm') nmSenhaConfirm: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private usuarioService: UsuarioService,
    private snackBar: SnackBarService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
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
            this.snackBar.error(error.message, error.status);
          }
        );
      }
    });
  }

  onSubmit() {
    if(this.formGroup.invalid) {
      this.snackBar.alert("Existem campos inválidos.");
      return;
    }

    if(this.formGroup.getRawValue().nmSenha != this.nmSenhaConfirm.nativeElement.value) {
      this.snackBar.alert("A senha não confere.");
      return;
    }

    let usuario = this.formGroup.getRawValue();
    usuario.stUsuario = (usuario.stUsuario ? Situacao.ATIVO : Situacao.INATIVO);
    this.usuarioService.save(usuario).subscribe(
      usuario => {
        this.usuario = usuario;
        this.formGroup = this.buildFormGroup(this.usuario);
        this.snackBar.success("Salvo com sucesso.");
      }, err => {
        let error = err.error;
        this.snackBar.error(error.message, error.status);
      }
    );

  }

  buildFormGroup(usuario: Usuario) {
    return new FormGroup({
        cdUsuario: new FormControl(usuario.cdUsuario),
        nmUsuario: new FormControl(usuario.nmUsuario, [Validators.required]),
        stUsuario: new FormControl(usuario.stUsuario),
        nmLogin: new FormControl(usuario.nmLogin, [Validators.required]),
        nmSenha: new FormControl(usuario.nmSenha, [Validators.required]),
        nmEmail: new FormControl(usuario.nmEmail),
        nmFuncao: new FormControl(usuario.nmFuncao),
        nmRole: new FormControl(usuario.nmRole || UserRole.USER, [Validators.required]),
        token: new FormControl(usuario.token)
    });
}

}
