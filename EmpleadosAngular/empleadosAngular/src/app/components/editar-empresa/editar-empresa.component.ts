import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresas.model';
import { EmpresasService } from 'src/app/services/empresas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.sass']
})
export class EditarEmpresaComponent implements OnInit {

  public empresaModelGet: Empresas;
  public empresaModelGetId: Empresas;
  public empresasModelPost: Empresas;
  public token;

  constructor( public empresasService: EmpresasService) {
    this.token = this.empresasService.getToken()
    this.empresaModelGetId = new Empresas('','','' ,'','','','');
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(){

      this.empresasService.VerEmpresas(this.token).subscribe(
        (response)=>{
          this.empresaModelGet = response.Empresas;
          console.log(this.empresaModelGet)
        },
        (error)=>{
          console.log(error);
        }
      )

  }

  eliminarEmpresas(id){
    this.empresasService.eliminarEmpresas(id,this.token).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresas();
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({

          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  getEmpresasId(idEmpresa){
    this.empresasService.obtenerEmpresaId(idEmpresa,this.token).subscribe(
      (response)=>{
        this.empresaModelGetId = response.Empresa;
        console.log(this.empresaModelGetId);
      },
      (error)=> {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  putEmpresa(){
    this.empresasService.editarEmpresa(this.empresaModelGetId, this.token).subscribe(
      (response)=> {
        console.log(response);
        this.getEmpresas()
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

}
