import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubirMemePage } from './subir-meme';

@NgModule({
  declarations: [
    SubirMemePage,
  ],
  imports: [
    IonicPageModule.forChild(SubirMemePage),
  ],
})
export class SubirMemePageModule {}
