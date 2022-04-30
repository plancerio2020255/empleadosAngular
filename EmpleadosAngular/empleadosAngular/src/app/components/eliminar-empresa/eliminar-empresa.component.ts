import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresas.model'
import { EmpresasService } from 'src/app/services/empresas.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-empresa',
  templateUrl: './eliminar-empresa.component.html',
  styleUrls: ['./eliminar-empresa.component.sass'],
  providers: [EmpresasService]

})
export class EliminarEmpresaComponent implements OnInit {

  public empresasModelGet: Empresas;
  public empresasModelGetId: Empresas;
  public token;


  constructor(public empresaService: EmpresasService) {
    this.token = this.empresaService.getToken()
    this.empresasModelGetId = new Empresas('','','','','','','');
   }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(){

    this.empresaService.VerEmpresas(this.token).subscribe(
      (response)=>{
        this.empresasModelGet = response.Empresas;
        console.log(this.empresasModelGet)
      },
      (error)=>{
        console.log(error);
      }
    )

}

  eliminarEmpresas(id){
    this.empresaService.eliminarEmpresas(id,this.token).subscribe(
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

}
