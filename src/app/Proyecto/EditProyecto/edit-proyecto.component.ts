import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/Models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {

 proyecto: Proyecto = new Proyecto("", new Date(), new Date());

  constructor(private service: ProyectoService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params.id;
    this.service.getProject(id).subscribe(
      data => {
        this.proyecto = data;
      },
      err => {
        this.toastr.error('Error al obtener el proyecto', 'Error', {
          timeOut: 3000
        });
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.service.update(id, this.proyecto).subscribe(
      data => {
          this.toastr.success('Proyecto editado', 'Correcto', {
            timeOut: 3000
          });
          this.router.navigate(['/']);
      },
      err => {
        this.toastr.error('Error al editar el proyecto', 'Error', {
          timeOut: 3000
        });
        this.router.navigate(['/']);
      }
    );
  }

}
