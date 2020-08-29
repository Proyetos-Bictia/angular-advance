import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';

import { HospitalService } from "../../../services/hospital.service";
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = []
  public hospitalesTemp: Hospital[] = []
  public cargando: boolean = true;
  public subscription: Subscription

  constructor(private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarHospital();
    this.subscription = this.modalImagenService.nuevaImagen
      .subscribe(() => this.cargarHospital())
  }

  cargarHospital() {
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
        console.log(hospitales);
      })
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospitales(hospital.nombre, hospital._id)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {

    Swal.fire({
      title: `Borrar ${hospital.nombre}?`,
      text: "Ud no podra revertir esto",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.value) {
        this.hospitalService.borrarHospitales(hospital._id)
          .subscribe(resp => {
            this.cargarHospital()
            Swal.fire('Eliminado', `${hospital.nombre} fué eliminado`, 'success');
          })
      }
    })

  }

  async crearHospital() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })
    if (value.trim().length > 0) {
      this.hospitalService.crearHospitales(value)
        .subscribe((resp: any) => {
          this.hospitales.push(resp.message)
        })
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img)
  }

  buscarHospital(palabra: string) {
    if (palabra.length === 0) {
      return this.hospitales = this.hospitalesTemp
    }
    this.busquedaService.buscar('hospitales', palabra)
      .subscribe(info => {
        this.hospitales = info
      });
  }

}