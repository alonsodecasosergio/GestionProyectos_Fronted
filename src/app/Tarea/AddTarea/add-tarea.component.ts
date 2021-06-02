import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { Tarea } from 'src/app/Models/tarea';
import { TareaDTO } from 'src/app/Models/tareaDTO';
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

  //ATRIBUTOS
  nombre: string='';
  descripcion: string='';
  fechaInicio = new Date();
  fechaFin = new Date();
  proyecto = new Proyecto("", new Date(), new Date()) ;
  usuario = new Usuario(this.proyecto, "", "", "", "");

  constructor(private serviceUsuario: UsuarioService, private serviceProject: ProyectoService , private service: TareaService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  /**
   * COMPRUEBA SI EL USUARIO ESTA LOGUEADO PARA QUE NO PRUEDA AÑADIR TAREAS SI NO ESTA LOQUEADO
   */
  ngOnInit(): void {

    //SI EL TOKEN DE USUAIRO ES VACIO SIGNIFICA QUE NO HAY NADIE CONECTADO
    if(this.serviceUsuario.getToken() != ''){
      this.obtenerProyecto();
      this.obtenerUsuario();

    }else{
      
      //SI NO HAY NADIE CONECTADO SE INFORMA
      this.toastr.error('Es necesario estar logeado para añadir una tarea', 'No esta logueado', {
        timeOut: 3000
      });
      this.router.navigate(['/login']);
    }
    
  }

  /**
   * CREACION DE UNA NUEVA TAREA
   */
  onCreate(): void {

    //TAREA CON LOS VALORES DEL FORMULARIO
    const tarea = new Tarea(this.nombre, this.descripcion, this.fechaInicio, this.fechaFin, this.proyecto, this.usuario);

    let tareaDTO = new TareaDTO(0,'', tarea);

    //ENVIA LA TAREA AL SERVICIO
    this.service.add(tarea).subscribe(
      data => {

        tareaDTO = data;

        console.log(tareaDTO);

        //SI EL RESULTADO ES EL ESPERADO SE INFORMA AL USUARIO
        if(tareaDTO.codigo >= 200 && tareaDTO.codigo < 300 ){          
          this.toastr.success(tareaDTO.mensaje, 'Correcto', {
            timeOut: 3000
          });
        }else{
          this.toastr.error(tareaDTO.mensaje, 'Error ' + tareaDTO.codigo, {
            timeOut: 3000
          });
        }
        //SE VUELVE AL LISTADO DE TAREAS
        this.router.navigate(['/homework/'+tarea.proyecto?.id]);
      }
    );
  }

  /**
   * RECUPERA EL PROYECTO SEGUN EL ID PASADO
   */
  obtenerProyecto(){
    //OBTIENE EL ID PASADO
    const id = this.activatedRoute.snapshot.params.id;

    //RECUPERA EL PROYECTO SEGUN EL ID Y LO GUARDA EN UNA VARIABLE
    this.serviceProject.getProject(id).subscribe(
      data => {
        this.proyecto = data;
      }
    );
  }

  /**
   * OBTIENE EL USUARIO SEGUN SU EMAIL CONECTADO
   */
  obtenerUsuario(){

    //RECUPERA EL USUARIO A PARTIR DEL EMAIL GUARDADO EN EL TOKEN DE CONEXION
    this.serviceUsuario.getFromEmail(this.serviceUsuario.getToken()).subscribe(
      data => {
        this.usuario = data;
      }
    );
  }

}
