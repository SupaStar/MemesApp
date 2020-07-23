import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {MemesProvider} from "../../providers/memes/memes";
import {NuevoComentarioPage} from "../nuevo-comentario/nuevo-comentario";
import {apiImg} from "../../app/global";

/**
 * Generated class for the VerMemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-meme',
  templateUrl: 'ver-meme.html',
})
export class VerMemePage {
  id: any;
  meme: any = {
    titulo: "",
    promedio: "",
    descripcion: "",
    ruta: ""
  };
  comentarios = [];
  idu: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private memeProv: MemesProvider,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController) {

  }

  ionViewDidEnter() {
    this.idu = localStorage.getItem('id');
    this.id = this.navParams.get('id');
    this.getMeme();
  }

  getMeme() {
    const loader = this.loadingCtrl.create({
      content: "Cargando meme..."
    });
    loader.present();
    this.memeProv.verMeme(this.id).subscribe((result) => {
      this.meme = result;
      this.meme.ruta = apiImg + result.ruta;
      loader.dismiss();
    }, (error: any) => {
      loader.dismiss();
      this.toastCtrl.create({
        message: "Ocurrio un error al cargar el meme.",
        duration: 1500
      }).present();
    });
    const loadera = this.loadingCtrl.create({
      content: "Cargando comentarios..."
    });
    loadera.present();
    this.memeProv.comentariosM(this.id).subscribe((result) => {
      this.comentarios = result.comentarios;
      loadera.dismiss();
    }, (error: any) => {
      loadera.dismiss();
      this.toastCtrl.create({
        message: "Ocurrio un error al cargar los comentarios.",
        duration: 1500
      }).present();
    })
  }

  nuevo() {
    this.navCtrl.push(NuevoComentarioPage, {
      id: this.id
    });
  }
}
