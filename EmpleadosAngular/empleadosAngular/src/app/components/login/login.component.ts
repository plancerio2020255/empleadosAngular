import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuario;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
    ) {
    this.usuarioModel = new Usuario(
      "",
      "",
      "",
      "",
      ""
    );
  }

  ngOnInit(): void {
    console.log(this._usuarioService.getToken());

  }

  getToken(){
    this._usuarioService.login(this.usuarioModel, "true").subscribe(
      (response)=>{
        console.log(response.token);
        localStorage.setItem("token", response.token);
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

  getTokenPromesa(): Promise<any>{
    return new Promise((resolve, rejects)=>{
      this._usuarioService.login(this.usuarioModel, "true").subscribe(
        (response)=>{
          localStorage.setItem("token", response.token);
          resolve(response);
        },
        (error)=>{
          console.log(<any>error);
        }
      )
    })
  }

  login(){
    this._usuarioService.login(this.usuarioModel).subscribe(
      (response)=>{

        this.getTokenPromesa().then(respuesta=>{
        console.log(response.usuario);
        localStorage.setItem('identidad', JSON.stringify(response.usuario))
        this._router.navigate([''])
        })
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
          title: 'No se pudo loguiar',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
  }

  


}
