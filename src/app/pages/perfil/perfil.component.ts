import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from "../../services/file-upload.service";

import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = ''

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {

    this.usuario = usuarioService.usuario
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  submitForm() {
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Succes', '<h1>Editado correctamente</h1>', 'success')
      }, (err) => Swal.fire('Error', err.error.error, 'error'))
  }

  cambiarEvento(file: File) {
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = ''
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result
      console.log(reader.result);
    }
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .subscribe((data) => {
        this.usuario.img = data
        Swal.fire('Succes', 'Imagen actualizada', 'success')
      }, (err) => Swal.fire('Error', 'No se pudo subir la imagen', 'error'))
  }

}
