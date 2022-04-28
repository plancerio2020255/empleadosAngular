import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs'
import {  HttpClient, HttpHeaders } from '@angular/common/http'
//import {  ProductosEmpresas } from '../models/productos-empresas.model'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public url : String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identidad;

  constructor(public http: HttpClient) { }

  /*agregarProducto(modeloProducto: ProductosEmpresa, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloProducto);

    return this.http.post(this.url + '/', parametros, { headers: headersToken })
  }*/

  obtenerProducto(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this.http.get(this.url + '/',{ headers: headersToken })
  }

  eliminarProductos(idProducto, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this.http.delete(this.url + '/'+ idProducto,{ headers: headersToken })
  }

  obtenerProductoId(idProducto, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token )

    return this.http.get(this.url + '/'+ idProducto, {headers: headersToken})
  }

 /* editarProductos(modeloProductos: ProductosEmpresa, token): Observable<any> {
    let parametros = JSON.stringify(modeloProductos);
    let headersToken = this.headersVariable.set('Authorization', token )

    return this.http.put(this.url + '/'+ modeloProductos._id, parametros,{ headers: headersToken})

  }*/

}