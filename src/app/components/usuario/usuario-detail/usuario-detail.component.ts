import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {

  usuario:Usuario;

  formGroup:FormGroup = new FormGroup({});

  constructor(
    private activatedRoute: ActivatedRoute, 
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsuario();  
  }

  loadUsuario() {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.usuarioService.get(params.get('id'))
        .subscribe(
          usuario => {
            this.usuario = usuario;
          },
          err => {
            let error = err.error;
            this.snackBar.open(error.message, error.status, { duration: 2000 });
          }
        );
      } else {
        this.usuario = new Usuario();
      }
      
      
    });
  }

}
