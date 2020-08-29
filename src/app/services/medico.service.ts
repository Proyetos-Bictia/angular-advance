import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Medico } from '../models/medico.model';

import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  cargarMedicos() {
    const url = `${base_url}/medicos`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { error: string, message: Medico[], statusCode: number }) => resp.message)
      )
  }

  crearMedico(medico: Medico) {
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers)
      .pipe(
        map((resp: { error: string, message: Medico, statusCode: number }) => resp.message)
      )
  }

  actualizarMedico(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers)
  }

  borrarMedico(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http.delete(url, this.headers)
  }

  // http://localhost:3000/api/medicos/5f43ef701f689418e8a73587
  obtenerMedicoPorId(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { error: string, message: Medico, statusCode: number }) => resp.message)
      )
  }

}
