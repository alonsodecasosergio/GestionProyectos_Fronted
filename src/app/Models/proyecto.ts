/**
 * MODELO DE PROYECTO
 */
export class Proyecto {

    //ATRIBUTOS
    id: number;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;

    //CONSTRUCTOR
    constructor(nombre: string, fechaInicio: Date, fechaFin: Date){
        this.id = 0;
        this.nombre = nombre;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

}
