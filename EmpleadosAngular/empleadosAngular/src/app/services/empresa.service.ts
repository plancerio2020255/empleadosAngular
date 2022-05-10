import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresas } from '../models/empresa.model'

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identidad;
  constructor(public _http: HttpClient) { }

  login(empresa, obtenerToken = null) : Observable<any> {
    if(obtenerToken != null) {
      empresa.obtenerToken = obtenerToken;
    }
    let params = JSON.stringify(empresa);

    return this._http.post(this.url + '/login', params, {headers: this.headersVariable})
  }

  getToken() {
    var token2 = localStorage.getItem("token")
    if(token2 != undefined) {
      this.token = token2
    } else {
      this.token = '';
    }
    return this.token;
  }

  getIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('identidad'))
    if(identidad2 ! = undefined) {
      this.identidad = identidad2
    } else {
      this.identidad = null
    }
    return this.identidad;
  }

  obtenerEmpresas(token) : Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/verEmpresa', {headers: headersToken})
  }

  agregarEmpresa(modeloEmpresa: Empresas) : Observable<any> {
    let parametros = JSON.stringify(modeloEmpresa);
    return this._http.post(this.url + '/agregarEmpresa', parametros, {headers: this.headersVariable})
  }
}
