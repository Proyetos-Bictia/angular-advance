import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = []

  public hospitalSeleccionado: Hospital
  public medicoSeleccionado: Medico

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => id !== 'nuevo' && this.cargarMedico(id))

    this.cargarHospitales()

    this.medicoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      hospital: ['', [Validators.required]]
    })

    this.medicoForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find((h) => h._id === hospitalId)
      })
  }

  cargarMedico(id: string) {
    this.medicoService.obtenerMedicoPorId(id)
      .pipe(
        delay(100)
      )
      .subscribe((resp) => {
        const { nombre, hospital: { _id } } = resp
        this.medicoSeleccionado = resp
        this.medicoForm.setValue({ nombre, hospital: _id })
      }, err => this.router.navigate(['/dashboard/medicos']) )
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((respuesta) => {
        this.hospitales = respuesta
      })
  }

  guardarMedico() {

    if(this.medicoSeleccionado) {
      //actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
        .subscribe(resp => {
          Swal.fire('Editado', `Medico ${this.medicoSeleccionado.nombre} editado exitosamente`, 'success');
        })
    } else {
      //crear
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((resp) => {
          Swal.fire('Creado', `Medico ${resp.nombre} creado exitosamente`, 'success');
          this.router.navigate(['/dashboard/medico/', resp._id])
        })
    }

  }



}
