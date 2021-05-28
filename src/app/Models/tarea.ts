import { Proyecto } from "./proyecto";
import { Usuario } from "./usuario";

/**
 * MODELO DE TAREA
 */
export class Tarea {
    
    //ATRIBUTOS
    id: number;
    proyecto: Proyecto;
    usuario: Usuario;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;

    //CONSTRUCTOR
    constructor(nombre: string, descripcion: string, fechaInicio: Date, fechaFin: Date, proyecto: Proyecto, usuario: Usuario){
        this.id = 0;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.proyecto = proyecto;
        this.usuario = usuario;
    }
}
