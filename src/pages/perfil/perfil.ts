import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SesionProvider} from "../../providers/sesion/sesion";
import {VerMemePage} from "../ver-meme/ver-meme";
import {apiImg} from "../../app/global";

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  id: any;
  usuario: any = {
    username: ""
  };
  memes = [];
  ruta = apiImg;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
              private sesProv: SesionProvider,private toastCtrl:ToastController) {
  }

  ionViewDidEnter() {
    this.id = localStorage.getItem('id');
    if (this.id != null) {
      const loader = this.loadingCtrl.create({
        content: "Cargando perfil..."
      });
      loader.present();
      this.sesProv.verPerfil(this.id).subscribe((result) => {
        this.usuario.username = result.username;
        loader.dismiss();
      }, (error: any) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: "Ocurrio un error al cargar el perfil.",
          duration: 1500
        }).present();
      });
      const loadera = this.loadingCtrl.create({
        content: "Cargando memes..."
      });
      loadera.present();
      this.sesProv.memesUsu(this.id).subscribe((result) => {
        this.memes = result;
        loadera.dismiss();
      },(error:any)=>{
        loadera.dismiss();
        this.toastCtrl.create({
          message: "Ocurrio un error al cargar tus memes.",
          duration: 1500
        }).present();
      });
    }
  }

  verMeme(id) {
    this.navCtrl.push(VerMemePage, {
      id: id
    });
  }
}
