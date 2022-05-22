import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Empresas } from '../models/empresas.model';
import { UsuarioService } from './usuario.service';
import {Productos} from '../models/productos.model';



@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;



  constructor(public _http: HttpClient) { }

  obtenerEmpresas(token): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/verEmpresas', { headers: headersToken })
  }

  agregarEmpresa(modeloEmpresas: Empresas): Observable<any> {
    let parametros = JSON.stringify(modeloEmpresas);
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());

    return this._http.post(this.url + '/registrarEmpresa', parametros, {headers: headersToken})
  }


  obtenerEmpresaID(idEmpresa:String): Observable<any>{

    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());

    return this._http.get(this.url + '/obtenerEmpresa/' + idEmpresa, {headers: headersToken});
   }


   editarEmpresa(modeloEmpresas: Empresas): Observable<any>{
    let parametros = JSON.stringify(modeloEmpresas);

    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());

    return this._http.put(this.url + '/editarEmpresa/' + modeloEmpresas._id, parametros, {headers: headersToken});
  }



  eliminarEmpresa(idCat : String): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.delete(this.url + '/eliminarEmpresa/' + idCat, { headers: headersToken })
  }

  obtenerToken(){
    var token2 = localStorage.getItem('token');

    if(token2 != 'undefined'){
      this.token = token2;
    } else{
      this.token = null;
    }

  return this.token;
  }


    /* PRODUCTOS */

     agregarProductos(modeloProducto: Productos, token): Observable<any> {
       let parametros = JSON.stringify(modeloProducto);
       let headersToken = this.headersVariable.set('Authorization', token)
       return this._http.put(this.url + '/agregarProductoEmpresa', parametros, {headers: headersToken})
    }



     obtenerProductos(token): Observable<any> {
       let headersToken = this.headersVariable.set('Authorization', token)
       return this._http.get(this.url + '/obtenerProductosEmpresa', {headers: headersToken})
    }



    obtenerProductosById(idProducto, token): Observable<any> {
       let headersToken = this.headersVariable.set('Authorization', token)
       return this._http.get(this.url + '/obtenerProductobyid' + idProducto, {headers: headersToken})
    }



    editarProducto(modeloProducto: Productos, token): Observable<any> {
        let headersToken = this.headersVariable.set('Authorization', token)
        let parametros = JSON.stringify(modeloProducto)
        return this._http.put(this.url + '/editarProductoEmpresa/' + modeloProducto._id, parametros, {headers: headersToken})
    }



    eliminarProducto(idProducto, token){
        let headersToken = this.headersVariable.set('Authorization', token)
         return this._http.delete(this.url + '/eliminarProductoEmpresa/'+ idProducto, {headers: headersToken})
    }



    agregarProductoaSucursal(modeloProducto: Productos, token, idSucursal, idProducto): Observable<any>{
      let parametros = JSON.stringify(modeloProducto);
      let headersToken = this.headersVariable.set('Authorization', token);
      return this._http.put(this.url + '/agregarProductosSucursal' + idSucursal + '/' + idProducto, parametros, {headers: headersToken})
    }


  }


