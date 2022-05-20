import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresa.model';
import { EmpresasService } from 'src/app/services/empresas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Productos } from 'src/app/models/productos.model';
import { Sucursales } from 'src/app/models/sucursales.model';
import { SucursalesService } from 'src/app/services/sucursales.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.sass'],
  providers: [EmpresasService]
})
export class EmpresasComponent implements OnInit {

  public empresasModelGet: Empresas;
  public empresasModelPost: Empresas;
  public token;
  public empresaProdModelGet: Empresas;
  public productosModelPost: Productos;
  public productosModelGetId: Productos;
  public producModelId: Productos;
  public sucursalModelGet: Sucursales;
  public SucursalId: String;
  stockk="Iniciar Sesion";
  constructor(private _empresasService: EmpresasService,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _sucursalesService: SucursalesService
    ) {
    this.empresasModelPost = new Empresas('','','','',[{nombreProducto: '',precioProducto: 0,stock: 0}])
    
    this.token = this._usuarioService.getToken();
    this.productosModelPost = new Productos(
      '',
      '',
      0,
      0
    )
    this.productosModelGetId = new Productos(
      '',
      '',
      0,
      0
    )
    this.producModelId = new Productos(
      '',
      '',
      0,
      0
    )


  }

  ngOnInit(): void {
    this.getEmpresa();
  }

  getEmpresa() {
    this._empresasService.obtenerEmpresas(this.token).subscribe(
      (response) => {
        console.log(response.empresa);
        this.empresasModelGet = response.empresa;
      },
      (err) => {
        console.log(<any>err)
      }
    )
  }

  postEmpresa() {
    this._empresasService.agregarEmpresas(this.empresasModelPost, this.token).subscribe(
      (response) => {
        console.log(response);
        this.getEmpresa();
        this.empresasModelPost.nombre = "";
        this.empresasModelPost.direccion = "";
        this.empresasModelPost.descripcion = "";
      },
      (err) => {
        console.log(<any>err)
      }
    )
  }
  getProductos() {
    this._empresasService.obtenerproductos(this.token).subscribe(

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
  deleteProducto(id) {
    this._empresasService.eliminarProductos(id, this.token).subscribe(
      (response) => {
        console.log(response);
        this.getProductos();

      }
    )
  }
  putProductos() {
    this._empresasService.editarProductos(this.productosModelGetId, this.token).subscribe(

      (response) => {
        console.log(response);
        this.getProductos();
      },
      (error) => {

      }

    )
  }

  getProductoId(idProducto){
    this._empresasService.obtenerProductosId(idProducto, this.token).subscribe(
      (response)=>{
        console.log(response);
        this.productosModelGetId = response.productos;

      },
      (error)=>{

      }
    )
  }
  postAgregarProd(idProducto){
    this._empresasService.obtenerProductosId(idProducto, this.token).subscribe(
      (response) => {
        console.log(response);
        this.productosModelGetId = response.productos;
      //  this._router.navigate(['/empre-suc/dashboard']);

      },
      (err) => {
        console.log('Hubo un error');

      }

    )

  }
  getSucursales(){
    this._sucursalesService.obtenerSucursales(this.token).subscribe(
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

    this._empresasService.agregarProductosSucursal(this.productosModelGetId, this.token, this.getIdSucursal, this.productosModelGetId._id).subscribe(

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