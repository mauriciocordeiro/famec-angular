import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(module => module.HomeModule), data: { breadcrumb: 'Home' } },
  { path: 'familias', loadChildren: () => import('./components/familia/familia.module').then(module => module.FamiliaModule), data: { breadcrumb: 'Famílias' } },
  { path: 'usuarios', loadChildren: () => import('./components/usuario/usuario.module').then(module => module.UsuarioModule), data: { breadcrumb: 'Usuários' } },
  { path: 'relatorios', loadChildren: () => import('./components/relatorio/relatorio.module').then(module => module.RelatorioModule), data: { breadcrumb: 'Relatórios' } },
  { path: 'sobre', loadChildren: () => import('./components/sobre/sobre.module').then(module => module.SobreModule), data: { breadcrumb: 'Sobre' } },
  { path: '**', redirectTo: '404' },
  { path: '404', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
