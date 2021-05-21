import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EditUsuarioComponent } from './Usuarios/EditUsuario/edit-usuario.component';
import { VerUsuarioComponent } from './Usuarios/VerUsuario/ver-usuario.component';
import { AddProyectoComponent } from './Proyecto/AddProyecto/add-proyecto.component';
import { EditProyectoComponent } from './Proyecto/EditProyecto/edit-proyecto.component';
import { ListarProyectoComponent } from './Proyecto/ListarProyecto/listar-proyecto.component';
import { VerProyectoComponent } from './Proyecto/VerProyecto/ver-proyecto.component';
import { AddTareaComponent } from './Tarea/AddTarea/add-tarea.component';
import { EditTareaComponent } from './Tarea/EditTarea/edit-tarea.component';
import { ListarTareaComponent } from './Tarea/ListarTarea/listar-tarea.component';
import { VerTareaComponent } from './Tarea/VerTarea/ver-tarea.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    EditUsuarioComponent,
    VerUsuarioComponent,
    AddProyectoComponent,
    EditProyectoComponent,
    ListarProyectoComponent,
    VerProyectoComponent,
    AddTareaComponent,
    EditTareaComponent,
    ListarTareaComponent,
    VerTareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
