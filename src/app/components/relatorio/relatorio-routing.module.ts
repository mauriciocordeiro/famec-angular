import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelatorioComponent } from './relatorio.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: '', component: RelatorioComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }
