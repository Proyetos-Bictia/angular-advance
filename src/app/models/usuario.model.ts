import { environment } from "../../environments/environment";

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public role: 'ADMIN_ROLE' | 'USER_ROLE',
        public email: string,
        public nombre: string,
        public google?: boolean,
        public img?: string,
        public uid?: string,
        public password?: string,
    ) { }

    get imagenUrl() {
        if (this.img) {
            return `${base_url}/uploads/usuarios/${this.img}`;
        } else {
            return `${base_url}/uploads/no-image/sdj`;
        }
    }
}