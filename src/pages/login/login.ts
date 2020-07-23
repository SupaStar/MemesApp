import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SesionProvider} from "../../providers/sesion/sesion";
import {TabsPage} from "../tabs/tabs";
import {RegistroPage} from "../registro/registro";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuario: any = {
    username: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private sesionProv: SesionProvider,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    var id = localStorage.getItem('id');
    if (id != undefined && id != null) {
      this.navCtrl.setRoot(TabsPage);
    }
  }

  ionViewDidLoad() {
  }

  iniciarSesion() {
    const loader = this.loadingCtrl.create({
      content: "Iniciando sesion..."
    });
    loader.present();
    this.sesionProv.iniciarSesion(this.usuario).subscribe((result) => {
      if (result.estado) {
        localStorage.setItem('id', result.id);
        this.navCtrl.setRoot(TabsPage);
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
        message: "Ocurrio un error al logearte.",
        duration: 1500
      }).present();
    });
  }

  registro() {
    this.navCtrl.push(RegistroPage);
  }
}
