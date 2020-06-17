import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable, Subject } from 'rxjs';
import { ThemeService } from './core/services/theme.service';
import { Usuario } from './model/usuario';
import { MatDrawer } from '@angular/material/sidenav';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'famec-angular';
  isDarkTheme: Observable<boolean>;
  isDark = false;

  usuario: Usuario;
  isLoggedIn = false;

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  @ViewChild('drawer') drawer: MatDrawer;

  constructor(
    private authService: AuthService, 
    private themeService: ThemeService,
    private loaderService: LoaderService) { }

  ngOnChanges() {
    this.isLoading = this.loaderService.isLoading;
  }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;

    if(this.authService.getUser()) {
      this.usuario = this.authService.getUser();
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
  }

  toggleSidenav() {
    if(this.authService.getUser()) {
      this.usuario = this.authService.getUser();
    }

    this.isLoggedIn = this.authService.isLoggedIn();
    this.drawer.toggle();
  }

  // abrirPerfil() {
  //   this.router.navigate(['/usuarios/usuario', this.usuario.cdUsuario])
  // }
}
