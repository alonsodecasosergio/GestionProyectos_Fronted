import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { TareaDTO } from 'src/app/Models/tareaDTO';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioDTO } from 'src/app/Models/usuarioDTO';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { UsuarioService } from 'src/app/service/usuario.service';



/**
 * COMPONENETE PARA REGISTRAR UN USUARIO
 */
@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {

  hide = true;

  //ATRIBUTOS
  email: string='';
  password: string='';
  confirmPassword: string='';
  apellidos: string='';
  nombre: string='';
  idProyecto: number=0;
  seleccionado: number=0;
  proyectos: Proyecto[]=[];
  proyecto= new Proyecto("", new Date(), new Date());
  

  constructor(private serviceproyecto: ProyectoService, private service: UsuarioService, private toastr: ToastrService, private router: Router) { 
    //SE CARGAR TODOS LOS PROYECTOS PARA QUE APAREZCAN EN UN DESPLEGABLE
    this.serviceproyecto.listProjects().subscribe(
      data => {
        this.proyectos = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  ngOnInit(): void {
  }

  /**
   * REGISTRA UN NUEVO USUARIO
   */
  register() {

    //SE GUARDA EL PROYECTO SELECCIONADO SEGUN SU ID
    this.serviceproyecto.getProject(this.idProyecto).subscribe(
      data => {
        this.proyecto = data;
      },
      err => {
        console.log(err);
      }
    )

    //CREACION DEL USUARIO CON LOS VALORES DEL FORMULARIO
    const usuario = new Usuario(this.proyecto, this.nombre, this.apellidos, this.email, this.password);
    
    let usuarioDTO = new UsuarioDTO(0,'',usuario);

    //AÑADIDO DEL USUAIRO AL SERVICIO
    this.service.add(usuario).subscribe(
      data => {

        usuarioDTO = data;

        console.log(usuarioDTO);

        if(usuarioDTO.codigo >= 200 && usuarioDTO.codigo < 300){
          this.toastr.success(usuarioDTO.mensaje, 'Correcto', {
            timeOut: 3000
          });
          this.router.navigate(['login']);

        }else{

          this.toastr.error(usuarioDTO.mensaje, 'Error ' + usuarioDTO.codigo, {
            timeOut: 3000
          });

          this.router.navigate(['registrar']);

        }
      }
    ); 
  }

  //GUARDA EL ID DEL PROYECTO CADA VEZ QUE SE SELECCIONA
  capturar() {
    this.idProyecto = this.seleccionado;
    console.log(this.idProyecto);
  }

}
