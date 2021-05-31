import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { Usuario } from 'src/app/Models/usuario';
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
    //AÑADIDO DEL USUAIRO AL SERVICIO
    this.service.add(usuario).subscribe(
      data => {
          this.toastr.success('Usuario creado correctamente', 'Correcto', {
            timeOut: 3000
          });
          this.router.navigate(['login']);
      },
      err => {
        this.toastr.error('Error al crear el usuario', 'Error', {
          timeOut: 3000
        });
        this.router.navigate(['registrar']);
      }
    ); 
  }

  //GUARDA EL ID DEL PROYECTO CADA VEZ QUE SE SELECCIONA
  capturar() {
    this.idProyecto = this.seleccionado;
    console.log(this.idProyecto);
  }

}
