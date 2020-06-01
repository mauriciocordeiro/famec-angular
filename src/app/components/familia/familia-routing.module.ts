import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamiliaComponent } from './familia.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: '', component: FamiliaComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliaRoutingModule { }
