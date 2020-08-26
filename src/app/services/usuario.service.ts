import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { Usuario } from "../models/usuario.model";

declare const gapi: any

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario

  constructor(private http: HttpClient,
    private router: Router,
    private ngzone: NgZone) {
    this.googleInit()
  }

  get token(): string {
    return localStorage.getItem('token' || '');
  }

  get uid(): string {
    return this.usuario.uid || ''
  }

  googleInit() {

    return new Promise(resolve => {
      console.log('google init');

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '329978775994-br5n767pab3nss7v0d05gpjkk15netc7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve()
      });
    })

  }

  logout() {
    localStorage.removeItem('token');
    var auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(() => {
      this.ngzone.run(() => {
        this.router.navigate(['/login']);
      })
    });

  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { email, google, nombre, role, uid, img = 'no' } = resp.message.usuario
        console.log(resp.message)
        this.usuario = new Usuario(role, email, nombre, google, img, uid)
        localStorage.setItem('token', resp.message.token)
        return true
      }),
      catchError(err => of(false))
    )
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.message.token)
      })
    )
  }

  actualizarUsuario(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }

  loginUsuario(formData: LoginForm) {
    return this.http.post<any>(`${base_url}/login`, formData).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.message)
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post<any>(`${base_url}/login/google`, { token }).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.message)
      })
    );
  }

}
