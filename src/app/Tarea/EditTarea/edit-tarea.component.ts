import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { Tarea } from 'src/app/Models/tarea';
import { Usuario } from 'src/app/Models/usuario';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TareaService } from 'src/app/service/tarea.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-edit-tarea',
  templateUrl: './edit-tarea.component.html',
  styleUrls: ['./edit-tarea.component.css']
})
export class EditTareaComponent implements OnInit {

  proyecto = new Proyecto("", new Date(), new Date()) ;
  usuario = new Usuario(this.proyecto, "", "", "", "");

  tarea = new Tarea('', '', new Date(), new Date(), this.proyecto, this.usuario);

  constructor(private serviceUsuario: UsuarioService, private serviceProject: ProyectoService, private service: TareaService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.obtenerProyecto();
    this.obtenerUsuario();

    const id = this.activatedRoute.snapshot.params.id;
    this.service.get(id).subscribe(
      data => {
        this.tarea = data;
      },
      err => {
        this.toastr.error('Error al obtener la tarea', 'Error', {
          timeOut: 3000
        });
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void{

    const id = this.activatedRoute.snapshot.params.id;

    this.service.update(id, this.tarea).subscribe(

      data => {
        this.toastr.success('Tarea actualizada', 'Correcto', {
          timeOut: 3000
        });
        this.router.navigate(['homework/' + this.tarea.proyecto.id]);
    },
    err => {
      this.toastr.error('Error al editar la tarea', 'Error', {
        timeOut: 3000
      });
      this.router.navigate(['homework/' + this.tarea.proyecto.id]);
    } 

    );

  }

  obtenerProyecto(){
    const id = this.activatedRoute.snapshot.params.id;
    this.serviceProject.getProject(id).subscribe(
      data => {
        this.proyecto = data;
      }
    );
  }

  obtenerUsuario(){

    this.serviceUsuario.getFromEmail(this.serviceUsuario.getToken()).subscribe(
      data => {
        this.usuario = data;
      }
    );
  }
  

}
