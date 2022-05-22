import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public usuarioModel: Usuario;
  repeatPass: string = '';

  constructor(
    private userRest: UsuarioService
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
  }


  registro(){
    this.userRest.registro(this.usuarioModel).subscribe({
      next: (res:any)=>{
        Swal.fire({
          icon: 'success',
          title: res.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (err)=>{
        Swal.fire({
          icon: 'error',
          title: err.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

}
