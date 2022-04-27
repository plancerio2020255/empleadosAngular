import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresas.model';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.component.html',
  styleUrls: ['./agregar-empresa.component.sass'],
  providers: [EmpresasService]
})
export class AgregarEmpresaComponent implements OnInit {

  public empresaModelGet: Empresas;
  public empresaModelGetId: Empresas;
  public empresasModelPost: Empresas;
  public token;

  constructor(private empresaService: EmpresasService) {
    this.empresasModelPost = new Empresas(
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    )
     this.token = this.empresaService.getToken()
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(){

    this.empresaService.VerEmpresas(this.token).subscribe(
      (response)=>{
        this.empresaModelGet = response.Empresas;
        console.log(this.empresaModelGet)
      },
      (error)=>{
        console.log(error);
      }
    )

}

  postEmpresas(){
    this.empresaService.registrarEmpresa(this.empresasModelPost).subscribe(
      (response) => {
        console.log(response);
        this.getEmpresas();

        this.empresasModelPost.nombre = '';
        this.empresasModelPost.usuario = '';
        this.empresasModelPost.email = '';
        this.empresasModelPost.password = '';
        this.empresasModelPost.rol = '';
        this.empresasModelPost.tipoEmpresa = '';


      },
      (error) => {
        console.log(<any>error);
      }
    )
  }





}
