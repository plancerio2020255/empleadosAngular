import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs'
import {  HttpClient, HttpHeaders } from '@angular/common/http'
import {  Productos } from '../models/productos.model'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public url : String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identidad;

  constructor(public http: HttpClient) { }

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

  editarProductos(modeloProductos: Productos, token): Observable<any> {
    let parametros = JSON.stringify(modeloProductos);
    let headersToken = this.headersVariable.set('Authorization', token )

    return this.http.put(this.url + '/'+ modeloProductos._id, parametros,{ headers: headersToken})

  }

    agregarProducto(modeloProducto: Productos, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloProducto);

    return this.http.post(this.url + '/', parametros, { headers: headersToken })
  }
}
