import { Component } from '@angular/core';
import { Usuario } from './interfaces/usuario';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'famec-angular';
  isDarkTheme: Observable<boolean>;

  isDark = false;

  usuario: Usuario = {
    nmLogin: '',
    nmUsuario: ''
  };

  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  ngAfterViewInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    this.isDark = checked;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
