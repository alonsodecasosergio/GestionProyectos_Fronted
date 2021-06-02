import { noUndefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { ProyectoDTO } from 'src/app/Models/proyectoDTO';
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

    let proyecto = new ProyectoDTO(0, '', project);

    //SE ENVIA EL OBJETO CREADO AL SERVIDOR
    this.service.add(project).subscribe(
      data => {
        proyecto = data;
        
        console.log(proyecto);

        //SEGUN EL CODIGO DE ERROR SE MUESTRA UN MENSAJE U OTRO
        if(proyecto.codigo >= 200 && proyecto.codigo < 300 ){          
          this.toastr.success(proyecto.mensaje, 'Correcto', {
            timeOut: 3000
          });
        }else{
          this.toastr.error(proyecto.mensaje, 'Error ' + proyecto.codigo, {
            timeOut: 3000
          });
        }
        this.router.navigate(['/']);
      }
    );
  }
}
