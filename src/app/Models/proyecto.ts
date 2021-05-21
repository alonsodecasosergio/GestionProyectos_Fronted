export class Proyecto {

    id: number;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;

    constructor(nombre: string, fechaInicio: Date, fechaFin: Date){
        this.id = 0;
        this.nombre = nombre;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

}
