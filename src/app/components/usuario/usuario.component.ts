import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { SnackBarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.usuarioService.getAll()
    .subscribe(
      usuarios => {
        this.usuarios = usuarios;
      },
      err => {
        this.snackBar.error(err.error.message);
      }
    );
  }

}
