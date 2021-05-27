import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string='';
  password: string='';

  constructor(private service: UsuarioService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const proyecto = new Proyecto("", new Date(), new Date());
    const usuario = new Usuario(proyecto,'','', this.email, this.password);

    this.service.checked(usuario).subscribe(
      data => {
        this.email = data.email;
        if(this.email == ""){
          this.toastr.error('Usuario incorrecto', 'Error', {
            timeOut: 3000
          });
          this.router.navigate(['/login']);
        }else{
          this.toastr.success('Usuario correcto', 'Correcto', {
            timeOut: 3000
          });
          this.router.navigate(['/']);
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
