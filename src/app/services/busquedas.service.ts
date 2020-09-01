import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {


  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token' || '');
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string = '') {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<{ statusCode: number, error: string, message: any[] }>(url, this.headers)
      .pipe(
        map((item) => item.message)
      )
  }

  busquedaGlobal(termino: string) {
    const url = `${base_url}/todo/${termino}`;
    return this.http.get<{ statusCode: number, error: string, message: any[] }>(url, this.headers)
      .pipe(
        map((item) => item.message)
      )
  }

}
