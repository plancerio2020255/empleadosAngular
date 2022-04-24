import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public _http: HttpClient) { }

  login(usuario, obtenerToken = null) : Observable<any> {
    if(obtenerToken != null) {
      usuario.obtenerToken = obtenerToken;
    }
    let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/login', params, {headers: this.headersVariable})
  }

  /*
  obtenerEmpresas() : Observable<any> {
    return this.http.get(this.url + '/undefined', {headers: this.headersVariable})
  }
  */


}
