import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { Proyecto } from 'src/app/Models/proyecto';
import { Usuario } from 'src/app/Models/usuario';
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

    //COMPRUEBA EN EL SERVICIO SI LAS CREDENCIALES SON CORRECTAS
    this.service.checked(usuario).subscribe(
      data => {
        this.email = data.email;
        //SI NO ES CORRECTO NO PUEDE ACCEDER
        if(this.email == ""){
          this.toastr.error('Usuario incorrecto', 'Error', {
            timeOut: 3000
          });
          this.router.navigate(['/login']);
        }else{
          // SI EL USUARIO ES CORRECTO
          this.toastr.success('Usuario correcto', 'Correcto', {
            timeOut: 3000
          });
          //AÑADE SU EMAIL AL TOKEN DE CONECION Y LO REDIRIGE A SU PROYECTO ASOCIADO
          this.service.setToken(usuario.email);
          this.inicio.acceder();
          this.router.navigate(['/myProyect']);
        }
    },
    err => {
      this.toastr.error('El email debe tener formato email', 'Error', {
        timeOut: 3000
      });
      this.router.navigate(['/login']);
    }
    );
    
  }

}
