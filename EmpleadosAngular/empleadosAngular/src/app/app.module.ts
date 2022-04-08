import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AgregarEmpresaComponent } from './components/agregar-empresa/agregar-empresa.component';
import { EliminarEmpresaComponent } from './components/eliminar-empresa/eliminar-empresa.component';
import { VerEmpresaComponent } from './components/ver-empresa/ver-empresa.component';
import { AgregarSucursalComponent } from './components/agregar-sucursal/agregar-sucursal.component';
import { EliminarSucursalComponent } from './components/eliminar-sucursal/eliminar-sucursal.component';
import { EditarSucursalComponent } from './components/editar-sucursal/editar-sucursal.component';
import { VerSucursalComponent } from './components/ver-sucursal/ver-sucursal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    InicioComponent,
    AgregarEmpresaComponent,
    EliminarEmpresaComponent,
    VerEmpresaComponent,
    AgregarSucursalComponent,
    EliminarSucursalComponent,
    EditarSucursalComponent,
    VerSucursalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
