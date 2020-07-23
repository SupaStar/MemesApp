import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {MemesProvider} from "../../providers/memes/memes";
import {TabsPage} from "../tabs/tabs";
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {apiImg} from "../../app/global";

/**
 * Generated class for the SubirMemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subir-meme',
  templateUrl: 'subir-meme.html',
})
export class SubirMemePage {
  id: any;
  urlImagen: any = apiImg + "default.png";
  memeS: any = {
    id: "",
    categoria: "1",
    titulo: "",
    meme: "",
    descripcion: ""
  };
  base64 = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private imageP: ImagePicker,
              private loadingCtrl: LoadingController, private memesProv: MemesProvider, private toastCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.memeS.titulo = "";
    this.memeS.descripcion = "";
    this.memeS.meme = "";
    this.base64 = "";
  }

  imagen() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      quality: 100,
      outputType: 1,
      width: 520,
      height: 800
    };
    this.imageP.getPictures(options).then((imageData) => {
      if (imageData.length == 0) {
        this.base64 = "";
        this.memeS.meme = "";
      }
      else if (imageData != "OK") {
        this.memeS.meme = imageData[0];
        this.memeS.id = localStorage.getItem('id');
        this.base64 = 'data:image/png;base64,' + imageData;
      }
    }, (err => {
    }));
  }

  subir() {
    const loader = this.loadingCtrl.create({
      content: "Subiendo..."
    });
    loader.present();
    this.memesProv.subir(this.memeS).subscribe((result) => {
      if (result.estado) {
        loader.dismiss();
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
        message: "Ocurrio un error al subir el meme.",
        duration: 1500
      }).present();
    });
  }
}
