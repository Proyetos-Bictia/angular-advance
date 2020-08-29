import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Pipe({
  name: 'imageOtra'
})
export class ImageOtraPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {

    if(!img) {
      return `${base_url}/uploads/${tipo}/no-img`
    } else if(img.includes('https')) {
      return img
    } else if (img) {
      return `${base_url}/uploads/${tipo}/${img}`
    } else {
      return `${base_url}/uploads/${tipo}/no-img`
    }
  }

}
