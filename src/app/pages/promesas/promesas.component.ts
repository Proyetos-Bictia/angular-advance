import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    })
    // const promesa = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hola mundo');
    //   } else {
    //     reject('Algo salio mal');
    //   }
    // })

    // promesa.then((respuesta) => {
    //   console.log(respuesta);
    // }).catch(err => console.log(err))

    // console.log('Fin del init');

  }

  getUsuarios(): Promise<any> {
    const promesa = new Promise((resolve) => {
      fetch('https://reqres.in/api/users?page=2')
        .then(resp => resp.json())
        .then(body => resolve(body.data))
    })

    return promesa
  }

}
