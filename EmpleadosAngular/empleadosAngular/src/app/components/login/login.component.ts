import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresa.model';
import { EmpresasService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [EmpresasService]
})
export class LoginComponent implements OnInit {
  public empresaModel : Empresas

  constructor(private empresaService: EmpresasService) {
    this.empresaModel = new Empresas(
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
   console.log(this.empresaService.getToken())
  }

  getToken(){
    this.empresaService.login(this.empresaModel, "true").subscribe(
      (response) => {
        console.log(response)
        localStorage.setItem("token", response.token);
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  login() {
    this.empresaService.login(this.empresaModel).subscribe(
      (res) => {
        console.log(res.empresa);
        localStorage.setItem('identidad', JSON.stringify(res.empresa));
        this.getToken();
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

}
