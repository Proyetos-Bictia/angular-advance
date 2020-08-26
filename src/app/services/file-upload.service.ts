import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  base_url = environment.base_url

  constructor(private http: HttpClient) { }

  actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    const url = `${this.base_url}/uploads/${tipo}/${id}`;
    const formData = new FormData();
    formData.append('imagen', archivo);
    return this.http.put(url, formData, {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    }).pipe(
      map((resp: any) => resp.message.nombreArchivo)
    )
  }

}
