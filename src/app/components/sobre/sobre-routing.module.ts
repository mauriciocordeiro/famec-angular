import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SobreComponent } from './sobre.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: '', component: SobreComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SobreRoutingModule { }
