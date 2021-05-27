import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient, private cookies: CookieService) { }

  public add(usuario: Usuario): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'register', usuario);
  }

  public checked(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.post<any>(this.URL + 'checked', usuario);
  }

  public getFromEmail(email: string): Observable<Usuario>{
    return this.httpClient.get<any>(this.URL + `get/${email}`);
  }

  public setToken(usuario: string) {
    this.cookies.set("usuario", usuario);
  }

  public getToken(){
    return this.cookies.get("usuario");
  }

  public deleteToken(){
    this.cookies.delete("usuario");
  }
}
