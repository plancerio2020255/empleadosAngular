import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresas.model';
import Swal from 'sweetalert2';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public empresasModel: Empresas;

  constructor(private empresasService: EmpresasService) {
    this.empresasModel = new Empresas(
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    );
  }

  ngOnInit(): void {
  }

  getToken(){
    this.empresasService.login(this.empresasModel, "true").subscribe(
      (response)=>{
        console.log(response.token);
        localStorage.setItem("token", response.token)

      },
      (error)=>{
        console.log(<any>error);


      }
    )
  }

  login(){
    this.empresasService.login(this.empresasModel).subscribe(
      (response)=>{
        console.log(response.empresa);
        localStorage.setItem('identidad', JSON.stringify(response.empresa))
        this.getToken();
        Swal.fire({
          icon: 'success',
          title: 'Logeado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
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
    );
  }
}
