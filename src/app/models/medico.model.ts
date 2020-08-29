import { Hospital } from "./hospital.model";

interface _MedicoUsuario {
    _id: string,
    nombre: string,
    img: string
}

export class Medico {
    public nombre: string;
    public _id?: string;
    public img?: string
    public hospital?: Hospital;
    public usuario?: _MedicoUsuario;
}