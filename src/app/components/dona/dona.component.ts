import { Component, Input } from '@angular/core';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() titulo: string = 'Sin título'
  @Input() doughnutChartLabels: string[] = ['Sin labels']
  @Input() doughnutChartData = [
    [100],
  ]

  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ]




}
