import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProyectoComponent } from './Proyecto/AddProyecto/add-proyecto.component';
import { EditProyectoComponent } from './Proyecto/EditProyecto/edit-proyecto.component';
import { ListarProyectoComponent } from './Proyecto/ListarProyecto/listar-proyecto.component';
import { VerProyectoComponent } from './Proyecto/VerProyecto/ver-proyecto.component';
import { AddTareaComponent } from './Tarea/AddTarea/add-tarea.component';
import { ListarTareaComponent } from './Tarea/ListarTarea/listar-tarea.component';
import { AddUsuarioComponent } from './Usuarios/AddUsuario/add-usuario.component';
import { LoginComponent } from './Usuarios/Login/login.component';

const routes: Routes = [
  {path: '', component: ListarProyectoComponent},
  {path: 'homework/:id', component: ListarTareaComponent},
  {path: 'nuevo', component: AddProyectoComponent},
  {path: 'edit/:id', component: EditProyectoComponent},
  {path: 'addHomework/:id', component: AddTareaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: AddUsuarioComponent},
  {path: 'myProyect', component: VerProyectoComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
