import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SesionProvider} from "../../providers/sesion/sesion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  usuario: any = {
    username: "",
    mail: "",
    password: "",
    rpassword: ""
  };
  isEmail = false;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
              private sesionProv: SesionProvider, private toastCtrl: ToastController, public fb: FormBuilder) {
    this.isEmail = false;
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9-.]+$')
      ])]
    });
  }

  validate() {
    if (this.form.controls.email.valid) {
      this.isEmail = true;
    } else {
      this.isEmail = false;
    }
  }

  ionViewDidLoad() {
  }

  registrate() {
    if (!this.isEmail) {
      this.toastCtrl.create({
        message: "Falta el campo email o no es valido.",
        duration: 3000
      }).present();
    } else {
      const loader = this.loadingCtrl.create({
        content: "Registrando..."
      });
      loader.present();
      this.sesionProv.registro(this.usuario).subscribe((result) => {
        if (result.estado) {
          this.toastCtrl.create({
            message: "Usuario creado con exito",
            duration: 3000
          }).present();
          this.navCtrl.pop();
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
          message: "Ocurrio un error al registrarte.",
          duration: 1500
        }).present();
      })
    }
  }
}
