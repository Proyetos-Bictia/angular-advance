import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageOtraPipe } from "./image-otra.pipe";

@NgModule({
  declarations: [
    ImageOtraPipe
  ],
  exports: [
    ImageOtraPipe
  ]
})
export class PipesModule { }
