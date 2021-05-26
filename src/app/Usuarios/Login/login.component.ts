import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    this.service.checked(this.email, this.password).subscribe(
      data => {
        this.toastr.success('Usuario correcto', 'Correcto', {
          timeOut: 3000
        });
        this.router.navigate(['/']);
    },
    err => {
      this.toastr.error('Usuario incorrecto', 'Error', {
        timeOut: 3000
      });
      this.router.navigate(['/']);
    }
    );
    
  }

}
