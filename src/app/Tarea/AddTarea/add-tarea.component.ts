import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { Tarea } from 'src/app/Models/tarea';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TareaService } from 'src/app/service/tarea.service';

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrls: ['./add-tarea.component.css']
})
export class AddTareaComponent implements OnInit {

  nombre: string='';
  descripcion: string='';
  fechaInicio = new Date();
  fechaFin = new Date();
  proyecto = Proyecto ;

  constructor(private serviceProject: ProyectoService , private service: TareaService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const tarea = new Tarea(this.nombre, this.descripcion, this.fechaInicio, this.fechaFin);
    this.service.add(tarea).subscribe(
      data => {
        this.toastr.success('Tarea añadida', 'Correcto', {
          timeOut: 3000
        });
        this.router.navigate(['/homework/'+tarea.proyecto?.id]);
    },
    err => {
      this.toastr.error('Error al crear la tarea', 'Error', {
        timeOut: 3000
      });
      this.router.navigate(['/homework/'+tarea.proyecto?.id]);
    }
    );
    
  }

}
