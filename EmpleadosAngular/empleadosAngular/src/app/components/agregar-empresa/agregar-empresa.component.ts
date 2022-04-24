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

  constructor(private empresaService: EmpresasService) {
  }

  ngOnInit(): void {
  }



}
