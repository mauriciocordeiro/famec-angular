import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SobreComponent } from './components/sobre/sobre.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ThemeService } from './core/services/theme.service';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { LoaderService } from './core/services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { TokenValidatorInterceptor } from './interceptors/token-validator.interceptor';
import { UsuarioDetailComponent } from './components/usuario/usuario-detail/usuario-detail.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioItemListComponent } from './components/usuario/usuario-item-list/usuario-item-list.component';
import { GravatarModule } from 'ngx-gravatar';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { FamiliaComponent } from './components/familia/familia.component';
import { FamiliaItemComponent } from './components/familia/familia-item/familia-item.component';
import { FamiliaDetailComponent } from './components/familia/familia-detail/familia-detail.component';
import { AlunoDetailComponent } from './components/aluno/aluno-detail/aluno-detail.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SobreComponent,
    NotFoundComponent,
    LoaderComponent,
    UsuarioComponent,
    UsuarioDetailComponent,
    UsuarioItemListComponent,
    FamiliaComponent,
    FamiliaItemComponent,
    FamiliaDetailComponent,
    AlunoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,

    GravatarModule,
    BreadcrumbModule,
    NgxMaskModule.forRoot(),
    
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ThemeService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenValidatorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
