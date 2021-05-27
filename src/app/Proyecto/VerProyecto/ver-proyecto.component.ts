import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent implements OnInit {

  proyecto = new Proyecto("", new Date(), new Date());

  constructor(private serviceUsuario: UsuarioService, private service: ProyectoService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

    this.cargarProyecto();
  }

  cargarProyecto(){
    
    if(this.serviceUsuario.getToken() != ''){
      this.service.getProjectFromSession(this.serviceUsuario.getToken()).subscribe(
        data => {
          this.proyecto = data;
        },
        err => {
          this.toastr.error('error', 'Error', {
            timeOut: 3000
          });
          this.router.navigate(['/login']);
        }
      );
    }else{
      this.router.navigate(['/login']);
    }
  }

}
