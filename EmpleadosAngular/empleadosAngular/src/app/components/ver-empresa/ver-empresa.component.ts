import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresa.model';
import { EmpresasService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styleUrls: ['./ver-empresa.component.sass'],
  providers: [EmpresasService]
})
export class VerEmpresaComponent implements OnInit {

  public empresaModelGet: Empresas;
  public token;

  constructor(private empresaService: EmpresasService) {
    this.token = this.empresaService.getToken();
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
