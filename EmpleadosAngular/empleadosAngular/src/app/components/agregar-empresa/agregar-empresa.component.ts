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
  }

  postEmpresa() {
    this.empresaService.agregarEmpresa(this.empresasModelPost).subscribe(
      (res) => {
        console.log (res)
    },
    (error) =>{
      console.log( <any>error);
    }
    )
  }
}
