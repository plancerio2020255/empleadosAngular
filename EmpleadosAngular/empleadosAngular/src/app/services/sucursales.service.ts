import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Sucursales } from '../models/sucursales.model'

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  public url : String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public headersToken = new HttpHeaders({
    'Content Type': 'application/json',
    'Authorization': this.getToken()
  })
  public token;
  public identidad;

  constructor(public http: HttpClient) { }

  agregarSucursales(modeloSucursales: Sucursales, token): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token )
    let parametros = JSON.stringify(modeloSucursales);

    return this.http.post(this.url + '/agregarSucursales', parametros, { headers: headersToken })
  }

  editarSucursales(modeloSucursal:Sucursales, token): Observable<any> {
    let parametros = JSON.stringify(modeloSucursal);
    let headersToken = this.headersVariable.set('Authorization', token)

    return this.http.put(this.url + '/'+modeloSucursal._id, parametros, { headers: headersToken })
  }

  eliminarSucursales( idSucursales, token ): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token )
    return this.http.delete(this.url + '/'+ idSucursales, { headers: headersToken})
  }

  obtenerSucursales(token) : Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token )
    return this.http.get(this.url + '/VerSucursales', { headers: headersToken});
  }

  VerSucursales(token) : Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token )
    return this.http.get(this.url + '/', { headers: headersToken});
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





}
