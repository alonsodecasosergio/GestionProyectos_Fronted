import { Proyecto } from "./proyecto";

export class Usuario {
    id?: number;
    proyecto: Proyecto;
    nombre: string;
    apellidos: string;
    email: string;
    password: string;

    constructor(proyecto:Proyecto, nombre: string, apellidos: string, email: string, password: string){
        this.proyecto = proyecto;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
    }
}
