import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Hospital } from "../models/hospital.model";

import { environment } from "../../environments/environment";

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales() {
    const url = `${base_url}/hospitales`
    return this.http.get(url, this.headers)
      .pipe(
        map((item: { statusCode: number, message: Hospital[], error: string }) => item.message)
      )
  }

  crearHospitales(nombre: string) {
    const url = `${base_url}/hospitales`
    return this.http.post(url, { nombre }, this.headers)
  }

  actualizarHospitales(nombre: string, _id: string) {
    const url = `${base_url}/hospitales/${_id}`
    return this.http.put(url, { nombre }, this.headers)
  }

  borrarHospitales(_id: string) {
    const url = `${base_url}/hospitales/${_id}`
    return this.http.delete(url, this.headers)
  }

}
