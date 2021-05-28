import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularGestionProyectos';
  emailUsuarioConectado: string='';

  constructor(private service: UsuarioService, private router: Router) {  }

  /**
   * METODO EL CUAL CIERRA LA SESION
   * ELIMINANDO EL TOKEN
   */
  logOut(){
    this.service.deleteToken();
    this.emailUsuarioConectado = '';
    this.router.navigate(['/login']);
  }

  /**
   * METOOD EL CUAL GUARDA EL TOKEN EN UNA VARIABLE
   * PARA CONSULTARLA EN EL HTML
   */
  acceder(){
    this.emailUsuarioConectado = this.service.getToken();
  }
}
