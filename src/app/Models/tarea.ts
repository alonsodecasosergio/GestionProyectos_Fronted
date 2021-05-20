import { Proyecto } from "./proyecto";
import { Usuario } from "./usuario";

export class Tarea {
    id?: number;
    proyecto: Proyecto;
    usuario: Usuario;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;

    constructor(proyecto: Proyecto, usuario: Usuario, nombre: string, descripcion: string, fechaInicio: Date, fechaFin: Date){
        this.proyecto = proyecto;
        this.usuario = usuario;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }
}
