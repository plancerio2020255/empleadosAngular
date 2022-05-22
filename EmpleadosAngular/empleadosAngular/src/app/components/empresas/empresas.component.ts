import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresas.model';
import { EmpresasService } from 'src/app/services/empresas.services.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment, environment2 } from 'src/environments/environment';
import { Productos } from 'src/app/models/productos.model';
import { Sucursales } from 'src/app/models/sucursales.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss'],
  providers: [EmpresasService, UsuarioService]

})
export class EmpresasComponent implements OnInit {

  public empresasModelGet: Empresas;
  public empresasModelPost: Empresas;
  public empresaIDModel: Empresas;
  public empresaProdModelGet: Empresas;
  public productosModelPost: Productos;
  public productosModelGetId: Productos;
  public producModelId: Productos;
  public sucursalModelGet: Sucursales;
  public SucursalId: String;
  public token;

  constructor(
    private _empresasService: EmpresasService,
    private _usuarioService: UsuarioService,
    private _sucursaleServices: SucursalesService,
    ) {
    this.empresasModelPost = new Empresas(
      '',
      '',
      '',
      0,
      '',
      '',
      [{
        nombreProducto: '',
        precioProducto: 0,
        stock: 0
      }],
      ''
    );
    this.empresaIDModel = new Empresas('', '', '', 0, '', '',[{
      nombreProducto: '',
      precioProducto: 0,
      stock: 0 }],'')

    this.token = this._usuarioService.getToken()
    this.productosModelPost = new Productos(
      '',
      '',
      0,
      0 )
    this.productosModelGetId = new Productos(
      '',
      '',
      0,
      0 )
    this.producModelId = new Productos(
      '',
      '',
      0,
      0)
  }

  tipoEmpresas = environment2.tipoEmpresas;
  departamentos = environment.departamentos;

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(){
    this._empresasService.obtenerEmpresas(this.token).subscribe(
      (response) => {
        this.empresasModelGet = response.Empresas;
        console.log(response);},
      (error) => {
        console.log(<any>error);
      }
    )
  }



  postEmpresas(){
    this._empresasService.agregarEmpresa(this.empresasModelPost).subscribe(
      (response)=>{
        console.log(response);
        Swal.fire({
            icon: 'success',
            text: 'Se agrego correctamente la empresa'
          })
        this.getEmpresas();
        this.empresasModelPost.nombre = '';
        this.empresasModelPost.direccion = '';
        this.empresasModelPost.telefono = 0;
        this.empresasModelPost.descripcion = '';
        this.empresasModelPost.tipoEmpresa = '';
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning'
        })

      }
    )
  }


  obtenerEmpresasID(idEmpresa){
    this._empresasService.obtenerEmpresaID(idEmpresa).subscribe(
      response => {
        console.log(response);
        this.empresaIDModel = response.empresa;}
    )
  }



  editarEmpresa(){
    this._empresasService.editarEmpresa(this.empresaIDModel).subscribe(
      response => {
        console.log(response);
          Swal.fire({
            icon: 'success',
            text: 'Empresa editada correctamente'
          })
          this.getEmpresas();
      },
        error => {
          console.log(<any>error);
          Swal.fire({
            icon: 'warning',
            text: 'No se edito la Empresa'
          })
        }
    )
  }


  deleteEmpresa(idCat) {
    this._empresasService.eliminarEmpresa(idCat).subscribe(
      (response)=>{
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '!OK!',
          text: 'La empresa ' + [this.empresasModelPost.nombre] + ' se ha eliminado correctamente'
        })
        this.getEmpresas();
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: '!Opppsss....!',
          text: 'No se pudo obtener las empresas de la base de datos'
        })

      }
    )
  }

    //productos

    getProductos() {
      this._empresasService.obtenerProductos(this.token).subscribe(
        (response) => {
          console.log(response.productos);
          this.empresaProdModelGet = response.productos
        },
        (err) => {
          console.log('Hubo un error');
        }
      )
    }

    postProductos() {
      this._empresasService.agregarProductos(this.productosModelPost, this.token).subscribe(
        (response) => {
          console.log(response);
          this.getProductos();
          this.productosModelPost.nombreProducto = "";
          this.productosModelPost.precioProducto = 0;
          this.productosModelPost.stock = 0;
        },
        (err) => {
          console.log(<any>err)
        }
      )
    }

  putProductos() {
      this._empresasService.editarProducto(this.productosModelGetId, this.token).subscribe(
        (response) => {
          console.log(response);
          this.getProductos();
        },
        (error) => {
        }
      )
    }

    deleteProducto(id) {
      this._empresasService.eliminarProducto(id, this.token).subscribe(
        (response) => {
          console.log(response);
          this.getProductos();
        }
      )
    }

    getProductoId(idProducto){
      this._empresasService.obtenerProductosById(idProducto, this.token).subscribe(
        (response)=>{
          console.log(response);
          this.productosModelGetId = response.productos;
        },
        (error)=>{

        }
      )
    }

    postAgregarProd(idProducto){
      this._empresasService.obtenerProductosById(idProducto, this.token).subscribe(
        (response) => {
          console.log(response);
          this.productosModelGetId = response.productos;
        },
        (err) => {
          console.log('Hubo un error');

        }

      )

    }

  getSucursales(){
      this._sucursaleServices.obtenerSucursales(this.token).subscribe(
        (response) => {
          this.sucursalModelGet = response.sucursales;
          console.log(response);
        },
        (error) => {
          console.log(<any>error);

        }
      )
    }

  getIdSucursal(idSucursal, stock){
      this.getIdSucursal = idSucursal
      console.log(this.getIdSucursal);
  }

  agregarProd(){
      console.log(this.getIdSucursal);

      this._empresasService.agregarProductoaSucursal(this.productosModelGetId, this.token, this.getIdSucursal, this.productosModelGetId._id).subscribe(

        (response) => {

          console.log(response);
          this.productosModelGetId.nombreProducto = "";
          this.productosModelGetId.precioProducto = 0;
          this.productosModelGetId.stock = 0;
        },
        (err) => {

          console.log('Hubo un error');

        }

      )
    }



}

