import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {
    // this.retornaObservable()
    //   .pipe(
    //     retry(1)
    //   )
    //   .subscribe(
    //     valor => console.log('Subs', valor),
    //     (err) => console.log('Err', err),
    //     () => console.log('Obs terminado')
    //   )
    this.intervalSubs = this.retornaIntervalo()
      .subscribe(console.log)
  }

  retornaIntervalo(): Observable<number> {
    const intervalo$ = interval(500).pipe(
      // take(10),
      map(valor => valor + 1),
      filter(valor => valor % 2 === 0),
    );
    return intervalo$
  }

  retornaObservable(): Observable<number> {
    let i = 0
    const obs$: Observable<number> = new Observable(observer => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i == 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i == 3) {
          observer.error('i llego al valor de 3 error')
        }
      }, 1000)

    })
    return obs$
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }

}
