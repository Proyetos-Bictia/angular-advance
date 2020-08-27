import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from "../models/usuario.model";

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string = ''): string {
    const image = new Usuario('', '', '', false, value, '', '');
    return image.imagenUrl
  }

}
