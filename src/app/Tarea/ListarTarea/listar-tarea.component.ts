import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { Tarea } from 'src/app/Models/tarea';
import { Usuario } from 'src/app/Models/usuario';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TareaService } from 'src/app/service/tarea.service';
import { UsuarioService } from 'src/app/service/usuario.service';

/**
 * COMPONENTE EL CUAL LISTA LAS TAREAS DE UN PROYECTO
 */
@Component({
  selector: 'app-listar-tarea',
  templateUrl: './listar-tarea.component.html',
  styleUrls: ['./listar-tarea.component.css']
})
export class ListarTareaComponent implements OnInit {

  //ATRIBUTOS
  tareas: Tarea[] = [];
  emailUsuarioConectado: string='';
  proyecto: Proyecto = new Proyecto("", new Date(), new Date());

  constructor(private serviceUsuario: UsuarioService, private servicioProyecto: ProyectoService, private service: TareaService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  /**
   * CARGA LAS TAREAS Y GUARDA EN UNA VARIABLE EL EMAIL DEL USUARIO CONECTADO
   */
  ngOnInit(): void {
    this.cargarHomeworks();
    this.emailUsuarioConectado = this.serviceUsuario.getToken();
  }

  /**
   * MUESTRA TODAS LAS TAREAS SEGUN EL ID DEL PROYECTO SELECCIONADO
   */
  cargarHomeworks(): void{
    //OBTIENE EL ID DEL PROYECTO
    const id = this.activatedRoute.snapshot.params.id;

    //RECUPERA EL PROYECTO SEGUN EL ID
    this.servicioProyecto.getProject(id).subscribe(
      data => {
        this.proyecto = data;
      },
      err => {
        console.log(err);
      }
    )
    //RECUPERA LAS TAREAS SEGUN EL ID DEL PROYECTO
    this.service.listHomeworks(id).subscribe(
      data => {
        this.tareas = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  /**
   * MUESTRA LAS TAREAS DEL USUAIRO CONECTADO
   */
  myHomework(): void{
    //OBTIENE EL ID DEL PROYECTO
    const id = this.activatedRoute.snapshot.params.id;

    //RECUPERA EL PROYECTO SEGUN EL ID
    this.servicioProyecto.getProject(id).subscribe(
      data => {
        this.proyecto = data;
      },
      err => {
        console.log(err);
      }
    )
    //RECUPERA LAS TAREAS SEGUN EL EMAIL DEL USUARIO CONECTADO

      if(this.serviceUsuario.getToken() != ''){

        this.service.myHomework(this.serviceUsuario.getToken(), id).subscribe(
          data => {
            this.tareas = data;
          },
          err => {
            console.log(err);
          }
        )
      }else{
        this.toastr.error('Debe estar conectado para ver sus tareas', 'Error', {
          timeOut: 3000
        });
        this.router.navigate(['/login']);
      }
  }

  /**
   * BORRA LA TAREA
   * @param id ID DE LA TAREA A BORRAR
   */
  borrar(id: number) {
    this.service.delete(id).subscribe(
      data => {
        this.toastr.success('Tarea eliminada', 'Eliminado', {
          timeOut: 3000
        });
        this.cargarHomeworks();
      }, 
      err => {
        this.toastr.error('La tarea no ha podido ser eliminada', 'Error', {
          timeOut: 3000
        });
      }
    );
  }
}
