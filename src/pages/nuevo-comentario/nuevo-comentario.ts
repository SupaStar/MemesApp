import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {MemesProvider} from "../../providers/memes/memes";

/**
 * Generated class for the NuevoComentarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo-comentario',
  templateUrl: 'nuevo-comentario.html',
})
export class NuevoComentarioPage {
  calificacion: any = {
    puntuacion: 0,
    comentario: "",
    idmeme: "",
    id: ""
  };
  estrellasn: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private memesP: MemesProvider,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.calificacion.idmeme = this.navParams.get('id');
    this.calificacion.id = localStorage.getItem('id');
    this.estrellas();
  }

  estrellas() {
    this.estrellasn = 5 - this.calificacion.puntuacion;
  }

  calificar() {
    if (this.calificacion.puntuacion !== 0) {
      const loader = this.loadingCtrl.create({
        content: "Publicando comentario..."
      });
      loader.present();
      this.memesP.nuevoComentario(this.calificacion).subscribe((result) => {
        if (result.estado) {
          this.navCtrl.pop();
          this.toastCtrl.create({
            message: "Mensaje publicado con exito.",
            duration: 3000
          }).present();
        } else {
          let message = "";
          for (let f = 0; f < result.detalle.length; f++) {
            message += result.detalle[f] + "\n";
          }
          this.toastCtrl.create({
            message: message,
            duration: 3000
          }).present();
        }
        loader.dismiss();
      }, (error: any) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: "Ocurrio un error al publicar tu comentario.",
          duration: 1500
        }).present();
      });
    } else {
      // Mostrar Toast
      this.toastCtrl.create({
        message: "La puntuacion no puede ser 0",
        duration: 4000
      }).present();
    }
  }

  puntuar(i) {
    this.calificacion.puntuacion = i;
  }

  cerrar() {
    this.navCtrl.pop();
  }

}
