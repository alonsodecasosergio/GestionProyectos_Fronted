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

  nombre: string='';
  fechaInicio = new Date();
  fechaFin = new Date();

  constructor(private service: ProyectoService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const project = new Proyecto(this.nombre, this.fechaInicio, this.fechaFin);
    this.service.add(project).subscribe(
      data => {
          this.toastr.success('Proyecto añadido', 'Correcto', {
            timeOut: 3000
          });
          this.router.navigate(['/']);
      },
      err => {
        this.toastr.error('Error al crear el proyecto', 'Error', {
          timeOut: 3000
        });
        this.router.navigate(['/']);
      }
    );
  }
}
