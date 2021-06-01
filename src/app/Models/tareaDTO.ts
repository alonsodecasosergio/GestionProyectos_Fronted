import { Tarea } from "./tarea";

export class TareaDTO {
     //ATRIBUTOS
     codigo: number;
     mensaje: string;
     tarea: Tarea;
 
     //CONSTRUCTOR
     constructor(codigo: number, mensaje: string, tarea: Tarea){
         this.codigo = codigo;
         this.mensaje = mensaje;
         this.tarea = tarea;
     }
}