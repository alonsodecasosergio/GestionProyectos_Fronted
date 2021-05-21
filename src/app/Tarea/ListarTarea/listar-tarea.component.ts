import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { Tarea } from 'src/app/Models/tarea';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TareaService } from 'src/app/service/tarea.service';

@Component({
  selector: 'app-listar-tarea',
  templateUrl: './listar-tarea.component.html',
  styleUrls: ['./listar-tarea.component.css']
})
export class ListarTareaComponent implements OnInit {

  tareas: Tarea[] = [];
  proyecto: Proyecto = new Proyecto("", new Date(), new Date());

  constructor(private servicioProyecto: ProyectoService, private service: TareaService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarHomeworks();
  }


  cargarHomeworks(): void{
    const id = this.activatedRoute.snapshot.params.id;

    this.servicioProyecto.getProject(id).subscribe(
      data => {
        this.proyecto = data;
      },
      err => {
        console.log(err);
      }
    )

    this.service.listHomeworks(id).subscribe(
      data => {
        this.tareas = data;
      },
      err => {
        console.log(err);
      }
    )
  }

}
