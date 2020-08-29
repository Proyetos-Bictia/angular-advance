import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { MedicoService } from "../../../services/medico.service";
import { ModalImagenService } from "../../../services/modal-imagen.service";
import { BusquedasService } from 'src/app/services/busquedas.service';

import { Medico } from "../../../models/medico.model";

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = []
  public medicosTemp: Medico[] = []

  public cargando: boolean = true
  public imgSubscription: Subscription
  public sinResultados: boolean = false

  constructor(private medicoServices: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarMedicos()
    this.imgSubscription = this.modalImagenService.nuevaImagen
      .subscribe(() => {
        this.cargarMedicos()
      })
  }

  cargarMedicos() {
    this.cargando = true
    this.medicoServices.cargarMedicos()
      .subscribe((medicos) => {
        this.cargando = false
        this.medicos = medicos
        this.medicosTemp = medicos;
      })
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img)
  }

  busqueda(palabra: string) {
    console.log(palabra);
    if (palabra.length === 0) {
      this.sinResultados = false;
      this.medicos = this.medicosTemp;
      return
    }
    this.busquedaService.buscar('medicos', palabra)
      .subscribe((resp) => {
        if (resp.length === 0 && palabra.length !== 0) {
          this.sinResultados = true
        } else {
          this.sinResultados = false
          this.medicos = resp;
        }
      })
  }

  borrarMedico(medico: Medico) {

    Swal.fire({
      title: `Borrar ${medico.nombre}?`,
      text: "Ud no podra revertir esto",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.value) {
        this.medicoServices.borrarMedico(medico._id)
          .subscribe(() => {
            this.cargarMedicos()
            Swal.fire('Eliminado', `${medico.nombre} fué eliminado`, 'success');
          })
      }
    })
  }

}