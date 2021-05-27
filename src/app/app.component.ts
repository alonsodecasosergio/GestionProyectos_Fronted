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

  constructor(private service: UsuarioService, private router: Router) { }

  logOut(){
    this.service.deleteToken();
    this.router.navigate(['/login']);
  }
}
