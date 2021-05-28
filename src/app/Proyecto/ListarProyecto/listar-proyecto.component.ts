import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.css']
})
export class ListarProyectoComponent implements OnInit {

  proyectos: Proyecto[] = [];
  fechaFin = new Date();
  constructor(private service: ProyectoService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }


  cargarProyectos(): void{
    this.service.listProjects().subscribe(
      data => {
        this.proyectos = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  
  borrar(id: number) {
    this.service.delete(id).subscribe(
      data => {
        this.toastr.success('Proyecto eliminado', 'Eliminado', {
          timeOut: 3000
        });

        this.cargarProyectos();
      }, 
      err => {
        this.toastr.error('No se puede eliminar porque quedan tareas pendientes', 'Error', {
          timeOut: 3000
        });
      }
    );
  }

  filtrado(){
    this.proyectos = this.proyectos.filter(
      proyecto => proyecto.fechaFin < this.fechaFin
    );
  }

}
