import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [localStorage.getItem('remember') || false],
  });
  public auth2: any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioServices: UsuarioService,
    private _ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.renderButton();
  }


  login() {
    this.usuarioServices.loginUsuario(this.loginForm.value)
      .subscribe(resp => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value)
          localStorage.setItem('remember', this.loginForm.get('remember').value)
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.error, 'error')
      })
  }

  // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  // var id_token = googleUser.getAuthResponse().id_token;


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp()
  }

  async startApp() {

    await this.usuarioServices.googleInit();
    this.auth2 = this.usuarioServices.auth2;

    this.attachSignin(document.getElementById('my-signin2'));

  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        var id_token = googleUser.getAuthResponse().id_token;
        this.usuarioServices.loginGoogle(id_token).subscribe(() => {
          this._ngZone.run(() => this.router.navigate(['/']));
        });
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      })
  }
}
