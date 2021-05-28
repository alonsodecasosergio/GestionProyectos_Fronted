import { noUndefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-add-proyecto',
  templateUrl: './add-proyecto.component.html',
  styleUrls: ['./add-proyecto.component.css']
})
export class AddProyectoComponent implements OnInit {

  //ATRIBUTOS
  nombre: string='';
  fechaInicio = new Date();
  fechaFin = new Date();

  //CONSTRUCTOR
  constructor(private service: ProyectoService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * METODO EL CUAL CREA UN PROYECTO
   */
  onCreate(): void {

    //CREA UN PROYECTO RECOGIENDO LOS VALORES DEL FORMULARIO
    const project = new Proyecto(this.nombre, this.fechaInicio, this.fechaFin);

    //SE ENVIA EL OBJETO CREADO AL SERVIDOR
    this.service.add(project).subscribe(
      data => {
          //SI LA RESPUESTA ES LA CORRECTA INFORMA AL USUARIO
          this.toastr.success('Proyecto añadido', 'Correcto', {
            timeOut: 3000
          });
          this.router.navigate(['/']);
      },
      err => {
        //SI SUCEDE UN ERROR INFORMA AL USUARIO
        this.toastr.error('Error al crear el proyecto', 'Error', {
          timeOut: 3000
        });
        this.router.navigate(['/']);
      }
    );
  }
}
