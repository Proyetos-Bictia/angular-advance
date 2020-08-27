import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from "../../../services/busquedas.service";
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription
  public desde: number = 0;
  public cargando: boolean = true;


  constructor(private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe(() => {
      this.cargarUsuarios()
    })
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        if (usuarios.length !== 0) {
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
        }
        this.cargando = false;
      })
  }

  cambiarPagina(valor: number) {
    this.desde += valor
    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor
    }
    this.cargarUsuarios()
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp
    }
    this.busquedaService.buscar('usuarios', termino)
      .subscribe((resp) => {
        console.log(resp);
        this.usuarios = resp
      })
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'no se puede borrase ud', 'error');
    }
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      this.cargarUsuarios()
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario.uid)
          .subscribe((resp) => {
            this.cargarUsuarios()
            Swal.fire('Usuario eliminado', `${usuario.nombre} fue eliminado correctamente`, 'success');
          }, err => console.log(err));
      }
    })
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe((resp) => {
        console.log(resp);
      })
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img)
  }

}
