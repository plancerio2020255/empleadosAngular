import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresa.model';
import { Sucursales } from 'src/app/models/sucursales.model'
import { EmpresasService } from 'src/app/services/empresas.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import Swal from 'sweetalert2';
import { EmpresaComponent } from '../empresa/empresa.component';

@Component({
  selector: 'app-agregar-sucursal',
  templateUrl: './agregar-sucursal.component.html',
  styleUrls: ['./agregar-sucursal.component.sass'],
  providers: [SucursalesService]
})
export class AgregarSucursalComponent implements OnInit {
  public sucursalesModelGet: Sucursales;
  public sucursalesAdminModelGet: Sucursales;
  public sucursalesModelPost: Sucursales;
  public sucursalesModelGetId: Sucursales;
  public empresasModelGet: Empresas;
  public empresasModelGetId: Empresas;

  public token;

  constructor(
    private sucursalService: SucursalesService,
    public empresaService: EmpresasService ) {
    this.sucursalesModelPost = new Sucursales
      (
        '',
        '',
        '',
        0,
        '',
        ''
      )
      this.token = this.sucursalService.getToken()
  }

  ngOnInit(): void {
    this.getSucursales();
  }


load: boolean = false;

getSucursales() {
  this.sucursalService.obtenerSucursales(this.token).subscribe(
    (response) => {
      this.load = true;
      this.sucursalesModelGet = response.Sucursales;
      console.log(this.sucursalesModelPost)
    },
    (error) => {
      console.log(error);
    }
  )

}
postSucursales() {
  this.sucursalService.agregarSucursales(this.sucursalesModelPost, this.token).subscribe(
    (response)=>{
      console.log(response);

      this.sucursalesModelPost.nombreSucursal = '';
      this.sucursalesModelPost.direccionSucursal = '';
      this.sucursalesModelPost.vendido = 0;
      this.sucursalesModelPost.idEmpresa = '';
      this.sucursalesModelPost.idMunicipio = '';
      this.getSucursales()
      Swal.fire({
        icon: 'success',
        title: 'Sucursal Agregado Correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    },
    (error) => {
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
