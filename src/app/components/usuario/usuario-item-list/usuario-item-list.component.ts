import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-usuario-item-list',
  templateUrl: './usuario-item-list.component.html',
  styleUrls: ['./usuario-item-list.component.css']
})
export class UsuarioItemListComponent implements OnInit {

  @Input() usuario: Usuario;

  constructor() { }

  ngOnInit(): void {
  }

}
