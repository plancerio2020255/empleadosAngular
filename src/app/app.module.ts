import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VerEmpleadosComponent } from './components/ver-empleados/ver-empleados.component';
import { AgregarEmpleadosComponent } from './components/agregar-empleados/agregar-empleados.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VerEmpleadosComponent,
    AgregarEmpleadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
