import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/Models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.css']
})
export class ListarProyectoComponent implements OnInit {

  proyectos: Proyecto[] = [];
  constructor(private service: ProyectoService) { }

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

}
