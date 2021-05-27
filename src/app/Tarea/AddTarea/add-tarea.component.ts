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
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrls: ['./add-tarea.component.css']
})
export class AddTareaComponent implements OnInit {

  nombre: string='';
  descripcion: string='';
  fechaInicio = new Date();
  fechaFin = new Date();
  proyecto = new Proyecto("", new Date(), new Date()) ;
  usuario = new Usuario(this.proyecto, "", "", "", "");

  constructor(private serviceUsuario: UsuarioService, private serviceProject: ProyectoService , private service: TareaService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerProyecto();
    this.obtenerUsuario();
  }

  onCreate(): void {

    const tarea = new Tarea(this.nombre, this.descripcion, this.fechaInicio, this.fechaFin, this.proyecto, this.usuario);

    this.service.add(tarea).subscribe(
      data => {
        this.toastr.success('Tarea añadida', 'Correcto', {
          timeOut: 3000
        });
        this.router.navigate(['/homework/'+tarea.proyecto?.id]);
    },
    err => {
      this.toastr.error('Error al crear la tarea', 'Error', {
        timeOut: 3000
      });
      this.router.navigate(['/homework/'+tarea.proyecto?.id]);
    }
    );
    
  }

  obtenerProyecto(){
    const id = this.activatedRoute.snapshot.params.id;
    this.serviceProject.getProject(id).subscribe(
      data => {
        this.proyecto = data;
        console.log("Proyecto " + this.proyecto.id);
      }
    );
  }

  obtenerUsuario(){

    this.serviceUsuario.getFromEmail(this.serviceUsuario.getToken()).subscribe(
      data => {
        this.usuario = data;
      }
    );
    console.log("Usuario " + this.usuario.email);
  }

}
