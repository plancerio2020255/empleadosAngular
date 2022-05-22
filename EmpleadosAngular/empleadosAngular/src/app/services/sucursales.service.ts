import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Sucursales } from '../models/sucursales.model';
import { Productos } from '../models/productos.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  public url : string = 'http://localhost:3000/api'
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;

  constructor(public _http: HttpClient) { }



  agregarSucursales(modeloSucursales: Sucursales, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloSucursales);
    return this._http.post(this.url + '/agregarSucursal', parametros, { headers: headersToken})
  }




  obtenerSucursales(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/obtenerSucursales', {headers: headersToken})
  }




  obtenerSucursalById(idSucursal, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + 'obtenerSucursal/' + idSucursal, {headers: headersToken})
  }




  editarSucursal(modeloSucursales: Sucursales, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloSucursales)
    return this._http.put(this.url + '/editarSucursal/' + modeloSucursales._id, parametros, {headers: headersToken})
  }




  eliminarSucursal(idSucursal, token){
  let headersToken = this.headersVariable.set('Authorization', token)
  return this._http.delete(this.url + '/eliminarSucursales/' + idSucursal, {headers: headersToken})
  }





  /* -----------------PRODUCTOS--------------- */

  obtenerProductos(idSucursal, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/obtenerProductos' + idSucursal, {headers: headersToken})
  }




  obtenerProductosById(idSucursal, token, idProducto): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/obtenerProductosS' + idProducto + '/' + idSucursal, {headers: headersToken})
  }




  venderProducto(modeloProducto: Productos, idSucursal, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloProducto)
    return this._http.put(this.url + '/generarVenta/' +  modeloProducto._id + '/' + idSucursal, parametros, { headers: headersToken})
  }

}
