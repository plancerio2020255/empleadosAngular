import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(
    private userRest: UsuarioService,
    public router: Router
  ){}

  canActivate(){
    let identity = this.userRest.getIdentidad();

    if(identity && (identity.rol === 'ADMIN' || identity.rol === 'EMPRESA')){
      return true;
    }else{
      this.router.navigate(['']);
      return false;
    }
  }

}
