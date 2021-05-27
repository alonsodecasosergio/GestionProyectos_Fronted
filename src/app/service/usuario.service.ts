import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  public add(id: number, usuario: Usuario): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'register', usuario);
  }

  public checked(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.post<any>(this.URL + 'checked', usuario);
  }
}
