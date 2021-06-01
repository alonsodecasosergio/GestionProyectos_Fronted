import { Usuario } from "./usuario";

export class UsuarioDTO {
    //ATRIBUTOS
    codigo: number;
    mensaje: string;
    usuario: Usuario;

    //CONSTRUCTOR
    constructor(codigo: number, mensaje: string, usuario: Usuario){
        this.codigo = codigo;
        this.mensaje = mensaje;
        this.usuario = usuario;
    }
}