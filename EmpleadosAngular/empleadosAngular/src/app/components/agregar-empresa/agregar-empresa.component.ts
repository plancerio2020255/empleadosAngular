import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresa.model';
import { EmpresasService } from 'src/app/services/empresa.service';
@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.component.html',
  styleUrls: ['./agregar-empresa.component.sass'],
  providers: [EmpresasService]
})
export class AgregarEmpresaComponent implements OnInit {

  public empresasModelPost: Empresas;
  public empresaModelGet: Empresas;

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
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  postEmpresa() {
    this.empresaService.agregarEmpresa(this.empresasModelPost).subscribe(
      (res) => {
        console.log ( res)
        this.getEmpresas();
    },
    (error) =>{
      console.log( <any>error);
    }
    )
  }

  getEmpresas(){
    this.empresaService.obtenerEmpresas().subscribe(
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
