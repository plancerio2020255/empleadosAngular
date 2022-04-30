import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Router } from '@angular/router';
import { EmpresasService } from '../services/empresas.service'

@Injectable({
  providedIn: 'root'
})
export class Validacion2GuardService implements CanActivate {
  public identidad;

  constructor(
    public router: Router,
    public userRest: EmpresasService
    ){}

  canActivate(){
    if (this.userRest.getIdentidad().rol === 'Empresa') {

      return true;
      
    }else{
      this.router.navigate(['/login'])
      
      return false;
    }
  }
  
}
