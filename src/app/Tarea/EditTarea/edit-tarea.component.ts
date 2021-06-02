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

/**
 * COMPONENTE PARA EDITAR UNA TAREA
 */
@Component({
  selector: 'app-edit-tarea',
  templateUrl: './edit-tarea.component.html',
  styleUrls: ['./edit-tarea.component.css']
})
export class EditTareaComponent implements OnInit {

  //ATRIBUTOS
  proyecto = new Proyecto("", new Date(), new Date()) ;
  usuario = new Usuario(this.proyecto, "", "", "", "");

  //SE CREA UNA TAREA VACIA
  tarea = new Tarea('', '', new Date(), new Date(), this.proyecto, this.usuario);

  constructor(private serviceUsuario: UsuarioService, private serviceProject: ProyectoService, private service: TareaService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  /**
   * SE CARGAN LOS DATOS DE LA TAREA PASADA EN LA TAREA VACIA
   */
  ngOnInit(): void {

    //OBTIENE EL PROYECTO DE ESA TAREA
    this.obtenerProyecto();

    //OBTIENE EL USUARIO EL CUAL EDITA ESA TAREA
    //SOLO PODRA SER EL MISMO QUE LA CREO
    this.obtenerUsuario();

    //OBTIENE LE ID DE LA TAREA PASADO COMO PARAMETRO
    const id = this.activatedRoute.snapshot.params.id;

    //SE OBTIENE LOS DATOS DE LA TAREA SEGUN SU ID
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

  /**
   * METODO EL CUAL ENVIA LA TAREA ACTUALIZADA
   */
  onUpdate(): void{

    //SE RECOGE EL ID PASADO COMO PARAMETRO
    const id = this.activatedRoute.snapshot.params.id;

    let tareaDTO = new TareaDTO(0,'', this.tarea);

    //SE ENVIA EL ID Y LA TAREA CON LOS NUEVOS VALORES AL SERVIDOR PARA QUE LA ACTUALICE
    this.service.update(id, this.tarea).subscribe(
      //INFORMA AL USUAIRO DE LO OCURRIDO
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
        this.router.navigate(['homework/' + this.tarea.proyecto.id]);
      }
    );

  }

  /**
   * OBTIENE EL PROYECTO 
   */
  obtenerProyecto(){
    const id = this.activatedRoute.snapshot.params.id;
    this.serviceProject.getProject(id).subscribe(
      data => {
        this.proyecto = data;
      }
    );
  }

  /**
   * OBTIENE EL USUARIO CONECTADO
   */
  obtenerUsuario(){

    this.serviceUsuario.getFromEmail(this.serviceUsuario.getToken()).subscribe(
      data => {
        this.usuario = data;
      }
    );
  }
  

}
