import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ThemeService } from './core/services/theme.service';
import { Usuario } from './model/usuario';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'famec-angular';
  isDarkTheme: Observable<boolean>;
  isDark = false;

  usuario: Usuario = new Usuario();
  isLoggedIn = false;

  @ViewChild('drawer') drawer: MatDrawer;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;

    if(localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
    
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngAfterViewInit() {
    
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    this.isDark = checked;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  toggleSidenav() {
    if(localStorage.getItem('usuario'))
      this.usuario = JSON.parse(localStorage.getItem('usuario'));

    
    this.isLoggedIn = this.authService.isLoggedIn();

    this.drawer.toggle();
  }
}
