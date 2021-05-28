import { Proyecto } from "./proyecto";

/**
 * MODELO DE USUARIO
 */
export class Usuario {

    //ATRIBUTOS
    id?: number;
    proyecto: Proyecto;
    nombre: string;
    apellidos: string;
    email: string;
    password: string;

    //CONSTRUCTOR
    constructor(proyecto:Proyecto, nombre: string, apellidos: string, email: string, password: string){
        this.proyecto = proyecto;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
    }
}
