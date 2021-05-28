import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../Models/proyecto';

/**
 * SERVICE DE PROYECTOS
 */
@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  //URL DEL SERVIDOR
  URL = 'http://localhost:8080/project/';

  constructor(private httpClient: HttpClient) { }


  /**
   * RECUPERACION DE LOS PROYECTOS
   * @returns LISTA DE TODOS LOS PROYECTOS
   */
  public listProjects(): Observable<Proyecto[]>{
    return this.httpClient.get<Proyecto[]>(this.URL + '/all');
  }

  /**
   * RECUPERACION DE UN UNICO PROYECTO
   * @param id ID DEL PROYECTO A OBTENER
   * @returns 
   */
  public getProject(id: number): Observable<Proyecto>{
    return this.httpClient.get<Proyecto>(this.URL + `get/${id}`);
  }

  /**
   * RECUPERA EL PROYECTO ASOCIADO AL USUARIO CONECTADO EN ESE MOMENTO
   * @param email EMAIL DEL USUARIO ACTUALMENTE CONECTADO
   * @returns 
   */
  public getProjectFromSession(email: string): Observable<Proyecto>{
    return this.httpClient.get<Proyecto>(this.URL + `proyectFromSession/${email}`);
  }

  /**
   * ENVIA UN PROYECTO PARA AÑADIR AL SERVIDOR
   * @param proyecto PROYECTO PARA AÑADIR
   * @returns 
   */
  public add(proyecto: Proyecto): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'add', proyecto);
  }

  /**
   * ACTUALIZACION DE UN PROYECTO 
   * @param id ID DEL PROYECTO A EDITAR
   * @param proyecto PROYECTO A EDITAR CON LOS NUEVOS VALORES
   * @returns 
   */
  public update(id: number, proyecto?: Proyecto): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, proyecto);
  }

  /**
   * BORRADO DE UN PROYECTO
   * @param id ID DEL PROYECTO A BORRAR
   * @returns 
   */
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `del/${id}`);
  }
}
