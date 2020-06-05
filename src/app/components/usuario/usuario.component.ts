import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usuarioService.getAll()
    .subscribe(
      usuarios => {
        this.usuarios = usuarios;
      },
      err => {
        this.snackBar.open(err.error.message, err.error.status, { duration: 2000 });
      }
    );
  }

}
