import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddProyectoComponent } from './Proyecto/AddProyecto/add-proyecto.component';
import { EditProyectoComponent } from './Proyecto/EditProyecto/edit-proyecto.component';
import { ListarProyectoComponent } from './Proyecto/ListarProyecto/listar-proyecto.component';
import { VerProyectoComponent } from './Proyecto/VerProyecto/ver-proyecto.component';
import { AddTareaComponent } from './Tarea/AddTarea/add-tarea.component';
import { EditTareaComponent } from './Tarea/EditTarea/edit-tarea.component';
import { ListarTareaComponent } from './Tarea/ListarTarea/listar-tarea.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './Usuarios/Login/login.component';
import { AddUsuarioComponent } from './Usuarios/AddUsuario/add-usuario.component';
import { CookieService } from 'ngx-cookie-service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';




@NgModule({
  declarations: [
    AppComponent,
    AddProyectoComponent,
    EditProyectoComponent,
    ListarProyectoComponent,
    VerProyectoComponent,
    AddTareaComponent,
    EditTareaComponent,
    ListarTareaComponent,
    LoginComponent,
    AddUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    HttpClientModule,
    NgbModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
