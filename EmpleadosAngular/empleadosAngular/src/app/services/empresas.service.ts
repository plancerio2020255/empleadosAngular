import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresas } from '../models/empresas.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public http: HttpClient) { }

  /*
  obtenerEmpresas() : Observable<any> {
    return this.http.get(this.url + '/undefined', {headers: this.headersVariable})
  }
  */

  agregarEmpresas(modeloEmpresa: Empresas) {
    let parametros = JSON.stringify(modeloEmpresa);

    return this.http.post(this.url + '/AgregarEmpresa', parametros, { headers: this.headersVariable})
  }

}
