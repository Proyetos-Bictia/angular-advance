import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  label: string[] = ['Pan', 'Refresco', 'Tacos'];
  data = [
    [10, 50, 20],
  ]

}
