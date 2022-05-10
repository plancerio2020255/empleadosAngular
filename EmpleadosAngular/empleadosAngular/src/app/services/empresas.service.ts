import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresas } from '../models/empresas.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  public token;
  public identidad;
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public http: HttpClient) { }


  login(empresa, obtenerToken = null): Observable<any> {

    if(obtenerToken != null){
      empresa.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(empresa);

    return this.http.post(this.url + '/login', params, { headers: this.headersVariable });
  }


  getToken(){
    var token2 = localStorage.getItem("token");
    if(token2 != undefined){
      this.token = token2
    } else {
      this.token = '';
    }

    return this.token;
  }

  clearToken(){
    localStorage.clear();

  }

  getIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if(identidad2 != undefined){
      this.identidad = identidad2;
    }else{
      this.identidad = null;
    }

    return this.identidad;
  }

   obtenerEmpresas(token) : Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this.http.get(this.url + '/verEmpresa', {headers: headersToken})
  }

  registrarEmpresa(modeloEmpresa: Empresas) : Observable<any> {
    let parametros = JSON.stringify(modeloEmpresa);

    return this.http.post(this.url + '/registrarEmpresa', parametros, {headers: this.headersVariable});
  }


  agregarEmpresas(modeloEmpresa: Empresas) {
    let parametros = JSON.stringify(modeloEmpresa);

    return this.http.post(this.url + '/agregarEmpresa', parametros, { headers: this.headersVariable})
  }

  obtenerEmpresaId(idEmpresa, token):Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token );
    return this.http.get(this.url + '/EmpresaId/'+ idEmpresa,{ headers: headersToken})
  }


  VerEmpresas(token) : Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token )
    return this.http.get(this.url + '/verEmpresa', { headers: headersToken});
  }

  eliminarEmpresas( idEmpresas, token ): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token )
    return this.http.delete(this.url + '/eliminarEmpresa/'+ idEmpresas, { headers: headersToken})
  }

  editarEmpresa(modeloEmpresa:Empresas, token):Observable<any> {
    let parametros = JSON.stringify(modeloEmpresa);
    let headersToken = this.headersVariable.set('Authorization', token)

    return this.http.put(this.url + ''+ modeloEmpresa._id, parametros, { headers: headersToken})
  }

}
