import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../Models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  URL = 'http://localhost:8080/project/';

  constructor(private httpClient: HttpClient) { }


  // METODOS PARA LA LLAMADA DEL CONTROLLADOR DE PROYECTO
  public listProjects(): Observable<Proyecto[]>{
    return this.httpClient.get<Proyecto[]>(this.URL + '/all');
  }

  public getProject(id: number): Observable<Proyecto>{

    return this.httpClient.get<Proyecto>(this.URL + `get/${id}`);
  }

  public getProjectFromSession(email: string): Observable<Proyecto>{

    return this.httpClient.get<Proyecto>(this.URL + `proyectFromSession/${email}`);
  }

  public add(proyecto: Proyecto): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'add', proyecto);
  }

  public update(id: number, proyecto?: Proyecto): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, proyecto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `del/${id}`);
  }
}
