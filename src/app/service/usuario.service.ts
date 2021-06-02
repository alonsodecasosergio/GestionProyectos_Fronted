import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/usuario';
import { UsuarioDTO } from '../Models/usuarioDTO';

/**
 * SERVICIO DEL MODELO USUARIO
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //URL DEL SERVIDOR
  URL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient, private cookies: CookieService) { }

  /**
   * AÑADE UN USUARIO
   * @param usuario USUARIO EL CUAL SE QUIERE AÑADIR
   * @returns 
   */
  public add(usuario: Usuario): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'register', usuario);
  }

  /**
   * LISTADO DE TODOS LOS USUAIROS
   * @returns LISTADO DE USUARIO
   */
  public listUsuarios(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.URL + '/all');
  }

  /**
   * COMPRUEBA SI EL EMAIL Y CONTRASEÑA SON CORRECTOS PARA 
   * PODER LOGUEARSE EN LA APLICACION
   * @param usuario USUARIO EL CUAL SE VA A LOGUEAR EN LA APLICACION
   * @returns 
   */
  public checked(usuario: Usuario): Observable<UsuarioDTO>{
    return this.httpClient.post<any>(this.URL + 'checked', usuario);
  }

  /**
   * DEVUELVE UN USUARIO SEGUN SU EMAIL
   * @param email EMAIL DEL USUARIO EL CUAL SE QUIERE OBTENER
   * @returns 
   */
  public getFromEmail(email: string): Observable<Usuario>{
    return this.httpClient.get<any>(this.URL + `get/${email}`);
  }

  /**
   * GUARDAR EL EMAIL DEL USUARIO CONECTADO EN ESE MOMENTO
   * @param usuario EMAIL DEL USUARIO CONECTADO EN ESE MOMENTO
   */
  public setToken(usuario: string) {
    this.cookies.set("usuario", usuario);
  }

  /**
   * DEVUELVE EL EMAIL DEL USUARIO CONECTADO EN ESE MOMENTO
   * @returns EMAIL DEL USUARIO CONECTADO
   */
  public getToken(){
    return this.cookies.get("usuario");
  }

  /**
   * BORRA EL USUARIO PARA CERRAR LA SESION
   */
  public deleteToken(){
    this.cookies.delete("usuario");
  }
}
