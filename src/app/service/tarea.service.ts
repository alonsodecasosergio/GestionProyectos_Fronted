import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../Models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  URL = 'http://localhost:8080/homework/';

  constructor(private httpClient: HttpClient) { }

  //METODOS PARA LA LLAMADA AL CONTROLADOR DE TAREAS

  public listHomeworks(id: number): Observable<Tarea[]>{
    return this.httpClient.get<Tarea[]>(this.URL + `${id}`);
  }

  //PASANDO EL ID DEL PROYECTO
  public myHomework(id: number): Observable<Tarea[]> {
    return this.httpClient.get<Tarea[]>(this.URL + `myHomework/${id}`);
  }

  public add(tarea: Tarea): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'add', tarea);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `del/${id}`);
  }

  public update(id: number, tarea: Tarea): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, tarea);
  }
}
