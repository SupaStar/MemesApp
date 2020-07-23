import {Component} from '@angular/core';
import {HomePage} from "../home/home";
import {PerfilPage} from "../perfil/perfil";
import {SubirMemePage} from "../subir-meme/subir-meme";
import {LoginPage} from "../login/login";
import {NavController, ToastController} from "ionic-angular";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  principal = HomePage;
  perfil = PerfilPage;
  subir = SubirMemePage;
  id: any;

  constructor(private navCtrl: NavController,private toastCtrl:ToastController) {
  }


  cerrarSesion() {
    this.id = localStorage.getItem('id');
    if (this.id == null || this.id == undefined) {
      this.toastCtrl.create({
        message: "No cuentas con sesion activa.",
        duration: 3000
      }).present();
    } else {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
    }

  }
}
