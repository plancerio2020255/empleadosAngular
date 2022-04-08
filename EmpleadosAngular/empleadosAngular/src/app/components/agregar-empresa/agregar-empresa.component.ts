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

  public empresasModelPost: Empresas;

  constructor(private empresaService: EmpresasService) {
    this.empresasModelPost = new Empresas(
      '',
      '',
      '',
      '',
      '',
      ''
    )
  }

  ngOnInit(): void {
  }

  postEmpresas() {
    this.empresaService.agregarEmpresas(this.empresasModelPost).subscribe(
      (res) => {
        console.log(res)
      },
      (error) => {
        console.log(<any> error);
      }
    )
  }

}
