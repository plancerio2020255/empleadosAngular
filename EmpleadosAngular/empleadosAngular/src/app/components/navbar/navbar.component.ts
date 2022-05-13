import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  providers: [EmpresasService]
})
export class NavbarComponent implements OnInit {
  public identidad;

  constructor() {
  }

  ngOnInit(): void {
  }

}
