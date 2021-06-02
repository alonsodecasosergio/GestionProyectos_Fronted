import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { Proyecto } from 'src/app/Models/proyecto';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioDTO } from 'src/app/Models/usuarioDTO';
import { UsuarioService } from 'src/app/service/usuario.service';

/**
 * COMPONENTE DE LOGIN
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //ATRIBUTOS
  email: string='';
  password: string='';
  

  constructor(private inicio: AppComponent, private service: UsuarioService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * COMPRUEBA QUE EL LOGIN SEA CORRECTO
   */
  login() {
    //VARIABLES PARA GUARDAR EL USUARIO RECUPERADO Y SU PROYECTO
    const proyecto = new Proyecto("", new Date(), new Date());
    const usuario = new Usuario(proyecto,'','', this.email, this.password);

    let usuarioDTO = new UsuarioDTO(0,'',usuario); 

    //COMPRUEBA EN EL SERVICIO SI LAS CREDENCIALES SON CORRECTAS
    this.service.checked(usuario).subscribe(
      data => {

        usuarioDTO = data;

        console.log(usuarioDTO);

        if(usuarioDTO.codigo >= 200 && usuarioDTO.codigo < 300){
          this.toastr.success(usuarioDTO.mensaje, 'Correcto', {
            timeOut: 3000
          });
          this.service.setToken(usuario.email);
          this.inicio.acceder();
          this.router.navigate(['/myProyect']);
        }else{
          this.toastr.error(usuarioDTO.mensaje, 'Error ', {
            timeOut: 3000
          });
          this.router.navigate(['/login']);

        }
    }
    );
    
  }

}
