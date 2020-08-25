export class Usuario {

    constructor(
        public role: string,
        public email: string,
        public nombre: string,
        public google?: boolean,
        public img?: string,
        public uid?: string,
        public password?: string,
    ) { }
}