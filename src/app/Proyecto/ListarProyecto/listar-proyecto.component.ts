import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { ProyectoDTO } from 'src/app/Models/proyectoDTO';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.css']
})
export class ListarProyectoComponent implements OnInit {

  //ATRIBUTOS
  proyectos: Proyecto[] = [];

  //SOLO SE UTILIZAN PARA EL FILTRADO POR FECHAS
  fechaFinDe = new Date();
  fechaFinHasta = new Date();

  //CONSTRUCTOR
  constructor(private service: ProyectoService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    //LAMADA AL METODO PARA CARGAR LOS PROYECTOS DEL SERVIDOR
    this.cargarProyectos();
  }

  /**
   * METODO EL CUAL ALMACENA LOS PROYECTOS DEL SERVIDOR EN UNA VARIABLE
   */
  cargarProyectos(): void{
    //SE LLAMA AL SERVICIO
    this.service.listProjects().subscribe(
      data => {
        //SI EL RESULTADO ES CORRECTO ALMACENA LOS PROYECTOS
        this.proyectos = data;
      },
      err => {
        //SI SUCEDE UN ERROR SE INFORMA
        console.log(err);
      }
    )
  }

  /**
   * BORRA UN PROYECTO SEGUN EL ID
   * @param id DEL PROYECTO A BORRAR
   */
  borrar(id: number) {

    let proyectoDTO = new ProyectoDTO(0, '', this.proyectos[0]);

    //SE PASA EL ID AL SERVICIO
    this.service.delete(id).subscribe(
      data => {

        proyectoDTO = data;

        console.log(proyectoDTO);

        if(proyectoDTO.codigo >= 200 && proyectoDTO.codigo < 300){
          this.toastr.success(proyectoDTO.mensaje, 'Correcto', {
            timeOut: 3000
          });
          //SE VUELVEN A CARGAR LOS PROYECTOS
        this.cargarProyectos();

        }else{
          this.toastr.error(proyectoDTO.mensaje, 'Error ' + proyectoDTO.codigo, {
            timeOut: 3000
          });
        }
      }
    );
  }

  /**
   * METODO PARA FILTRAR MEDIANTE FECHAS
   * MUESTRA LOS PROYECTOS LOS CUALES SU FECHA DE FIN SE ENCUENTRAN ENTRE 
   * LAS FECHAS INFDICADAS 
   */
  filtrado(){
    //PRIMERO SE FILTRA POR FEACHA DE INICIO
    this.proyectos = this.proyectos.filter(
      proyecto => proyecto.fechaFin > this.fechaFinDe
    );
    //Y LUEGO POR FECHA DE FIN
    this.proyectos = this.proyectos.filter(
      proyecto => proyecto.fechaFin < this.fechaFinHasta
    );
  }
}
