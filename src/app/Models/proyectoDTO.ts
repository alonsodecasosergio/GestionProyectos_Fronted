import { Proyecto } from "./proyecto";

/**
 * MODELO DTO DE PROYECTO
 */
 export class ProyectoDTO {

    //ATRIBUTOS
    codigo: number;
    mensaje: string;
    proyecto: Proyecto;

    //CONSTRUCTOR
    constructor(codigo: number, mensaje: string, proyecto: Proyecto){
        this.codigo = codigo;
        this.mensaje = mensaje;
        this.proyecto = proyecto;
    }

}