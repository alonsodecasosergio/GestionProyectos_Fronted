import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { ProyectoDTO } from 'src/app/Models/proyectoDTO';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {
 
  //CREACION DE UN OBJETO DE PROYECTO EL CUAL SE RELLENARA CON LOS DATOS DEL PROYECTO A EDITAR
 proyecto: Proyecto = new Proyecto("", new Date(), new Date());

 //CONSTRUCTOR
  constructor(private service: ProyectoService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  /**
   * CARGA LOS DATOS DEL PROYECTO A EDITAR
   */
  ngOnInit(): void {

    //AÑADIDO DE DATOS AL OBJETO CREADO ANTERIORMENTE A PARTIR DEL ID DEL PROYECTO
    const id = this.activatedRoute.snapshot.params.id;
    this.service.getProject(id).subscribe(
      data => {
        //SI EL RESULTADO ES CORRECTO SE ALMACENAN LOS DATOS
        this.proyecto = data;
      },
      err => {
        //SI EL RESULTADO NO ES CORRECTO SE INFORMA AL USUARIO
        this.toastr.error('Error al obtener el proyecto', 'Error', {
          timeOut: 3000
        });
        this.router.navigate(['/']);
      }
    );
  }

  /**
   * METODO EL CUAL EDITA EL PROYECTO SELECCIONADO
   */
  onUpdate(): void {

    //RECUPERACION EL ID DEL PROYECTO MEDIANTE PARAMETRO
    const id = this.activatedRoute.snapshot.params.id;

    let proyectoDTO = new ProyectoDTO(0, '', this.proyecto);

    //ENVIO DEL OBJETO ACTUALIZADO AL SERVICIO
    this.service.update(id, this.proyecto).subscribe(
      data => {

        proyectoDTO = data;

        console.log(proyectoDTO);

        //SEGUN EL CODIGO DE ERROR SE MUESTRA UN MENSAJE U OTRO
        if(proyectoDTO.codigo >= 200 && proyectoDTO.codigo < 300 ){          
          this.toastr.success(proyectoDTO.mensaje, 'Correcto', {
            timeOut: 3000
          });
        }else{
          this.toastr.error(proyectoDTO.mensaje, 'Error ' + proyectoDTO.codigo, {
            timeOut: 3000
          });
        }
        this.router.navigate(['/']);
      }
    );
  }
}
