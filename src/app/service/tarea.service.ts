import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../Models/tarea';

/**
 * SERVICIO DEL MODELO DE TAREA
 */
@Injectable({
  providedIn: 'root'
})
export class TareaService {

  //URL DEL SREVIDOR
  URL = 'http://localhost:8080/homework/';

  constructor(private httpClient: HttpClient) { }

  /**
   * LISTADO DE LAS TAREAS DE UN PROYECTO
   * @param id ID DEL PROYECTO DEL QUE SE QUIEREN MOSTRAR LAS TAREAS
   * @returns 
   */
  public listHomeworks(id: number): Observable<Tarea[]>{
    return this.httpClient.get<Tarea[]>(this.URL + `${id}`);
  }

  /**
   * LAS TAREAS DE UN PROYECTO DEL USUAIRO CONECTADO
   * @param email EMAIL DEL USUARIO CONECTADO EN ESE MOMENTO
   * @param id ID DEL PROYECTO DEL CUAL SE QUIERE VER LAS TAREAS DE ESE USUARIO
   * @returns 
   */
  public myHomework(email: string, id: number): Observable<Tarea[]> {
    return this.httpClient.get<Tarea[]>(this.URL + `myHomework/${email}/${id}`);
  }

  /**
   * AÑADE UNA TAREA
   * @param tarea TAREA LA CUAL SE QUIERE AÑADIR
   * @returns 
   */
  public add(tarea: Tarea): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'add', tarea);
  }

  /**
   * OBTIENE UNA TAREA
   * @param id ID DE LA TAREA QUE SE QUIERE RECOGER
   * @returns 
   */
  public get(id: number): Observable<Tarea>{
    return this.httpClient.get<any>(this.URL + `get/${id}`);
  }

  /**
   * BORRA UNA TAREA
   * @param id ID DE LA TAREA LA CUAL SE QUIERE BORRAR
   * @returns 
   */
  public delete(id: number): Observable<Tarea> {
    return this.httpClient.delete<any>(this.URL + `del/${id}`);
  }

  /**
   * ACTUALIZAR UNA TAREA
   * @param id ID DE LA TAREA QUE SE QUIERE ACTUALIZAR
   * @param tarea TAREA ACTUALIZADA CON LOS NUEVOS DATOS
   * @returns 
   */
  public update(id: number, tarea: Tarea): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, tarea);
  }
}
