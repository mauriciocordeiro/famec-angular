import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamiliaComponent } from './familia.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FamiliaDetailComponent } from './familia-detail/familia-detail.component';


const routes: Routes = [
  { path: '', component: FamiliaComponent, canActivate: [AuthGuard] },
  { path: 'familia', component: FamiliaDetailComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Família' } },
  { path: 'familia/:id', component: FamiliaDetailComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Família' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliaRoutingModule { }
