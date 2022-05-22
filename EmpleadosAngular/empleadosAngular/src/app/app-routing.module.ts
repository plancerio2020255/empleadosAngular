import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaPrincipallComponent } from './components/pagina-principal/pagina-principall.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { UsuarioGuard } from './guards/usuario.guard';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "inicio", component: PaginaPrincipallComponent},
  {path: "sucursales", component: SucursalesComponent, canActivate:[UsuarioGuard] },
  {path: "empresas", component: EmpresasComponent, canActivate:[UsuarioGuard] },
  {path:'', redirectTo:"/inicio", pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
