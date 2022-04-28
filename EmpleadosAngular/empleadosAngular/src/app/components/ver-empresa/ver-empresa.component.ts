import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresas.model';
import { EmpresasService } from 'src/app/services/empresas.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styleUrls: ['./ver-empresa.component.sass'],
  providers: [EmpresasService]
})
export class VerEmpresaComponent implements OnInit {

  public empresaModelGetId: Empresas;
  public empresaModelGet: Empresas;
  public token;
  public url : String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');



  constructor(public empresaService: EmpresasService,
    public http:HttpClient) {
    this.token = this.empresaService.getToken()
    this.empresaModelGetId = new Empresas('','','','','','','');
  }



  ngOnInit(): void {
     this.getEmpresas();
  }

    getEmpresas(){
    this.empresaService.obtenerEmpresas(this.token).subscribe(
      (res) => {
        this.empresaModelGet = res.Empresas;
        console.log(res.Empresas);
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }



}
