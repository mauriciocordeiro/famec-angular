import { Component } from '@angular/core';
import { Usuario } from './interfaces/usuario';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'famec-angular';

  usuario : Usuario = {
    nmLogin: '',
    nmUsuario: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  ngAfterViewInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }
}
