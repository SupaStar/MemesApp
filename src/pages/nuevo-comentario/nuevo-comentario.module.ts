import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoComentarioPage } from './nuevo-comentario';

@NgModule({
  declarations: [
    NuevoComentarioPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoComentarioPage),
  ],
})
export class NuevoComentarioPageModule {}
