import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';


const routes: Routes = [
  { path: '', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'usuario', component: UsuarioDetailComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Usuário' } },
  { path: 'usuario/:id', component: UsuarioDetailComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Usuário' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
