import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEmpresaComponent } from './components/agregar-empresa/agregar-empresa.component';
import { AgregarSucursalComponent } from './components/agregar-sucursal/agregar-sucursal.component';
import { EliminarEmpresaComponent } from './components/eliminar-empresa/eliminar-empresa.component';
import { EliminarSucursalComponent } from './components/eliminar-sucursal/eliminar-sucursal.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { InicioComponent } from './components/inicio/inicio.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { VerEmpresaComponent } from './components/ver-empresa/ver-empresa.component';
import { VerSucursalComponent } from './components/ver-sucursal/ver-sucursal.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  //Rutas de empresas
  {path: 'Empresa', component: EmpresaComponent},
  {path: 'agregarEmpresa', component: AgregarEmpresaComponent},
  {path: 'eliminarEmpresa', component: EliminarEmpresaComponent},
  {path: 'verEmpresa', component: VerEmpresaComponent},
  //Rutas de sucursales
  {path: 'agregarSucursales', component: AgregarSucursalComponent},
  {path: 'eliminarSucursales', component: EliminarSucursalComponent},
  {path: 'verSucursales', component: VerSucursalComponent},
  {path:'', redirectTo:"/inicio", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
