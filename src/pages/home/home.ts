import {Component} from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {MemesProvider} from "../../providers/memes/memes";
import {VerMemePage} from "../ver-meme/ver-meme";
import {apiImg} from "../../app/global";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  busqueda: any = {
    palabra: ""
  };
  orden = 1;
  memes = [];
  ruta = apiImg;
  memesCompletos = [];
  infinity: any;
  cantidadMemes = 6;
  id: any;

  constructor(public navCtrl: NavController, private memesProv: MemesProvider, private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.orden = 1;
    this.buscarMemes();
    this.getMemes();
  }

//TODO ion-fab para descargar
  getMemes() {
    const loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    loader.present();
    this.memesProv.memes("").subscribe((result) => {
      this.memes = [];
      this.memesCompletos = [];
      this.memesCompletos = result;
      var fin = this.cantidadMemes;
      if (result.length < fin) {
        fin = result.length;
        if (this.infinity != undefined) {
          this.infinity.enable(false);
        }
      }
      for (var i = 0; i < fin; i++) {
        this.memes.push(result[i]);
      }
      loader.dismiss();
    }, (error: any) => {
      loader.dismiss();
      this.toastCtrl.create({
        message: "Ocurrio un error al cargar los memes.",
        duration: 1500
      }).present();
    });
  }

  verMeme(id) {
    this.id = localStorage.getItem('id');
    if (this.id == null || this.id == undefined) {
      this.toastCtrl.create({
        message: "No cuentas con sesion activa.",
        duration: 1500
      }).present();
    } else {
      this.navCtrl.push(VerMemePage, {
        id: id
      });
    }
  }

  doInfinite(infiniteScroll) {
    this.orden = 1;
    this.buscarMemes();
    this.infinity = infiniteScroll;
    var inicio = this.memes.length;
    var fin = (this.memes.length) + this.cantidadMemes;
    var resta = this.memesCompletos.length - inicio;
    if (resta < this.cantidadMemes) {
      fin = (this.memes.length) + resta;
    }
    setTimeout(() => {
      for (var i = inicio; i < fin; i++) {
        this.memes.push(this.memesCompletos[i]);
      }
      this.quitarInfinite();
      infiniteScroll.complete();
    }, 500);
  }

  quitarInfinite() {
    if (this.memes.length == this.memesCompletos.length) {
      this.infinity.enable(false);
    }
  }

  refrescar(refresher) {
    this.orden = 1;
    this.buscarMemes();
    this.getMemes();
    if (this.infinity != undefined) {
      this.infinity.enable(true);
    }
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  buscarMemes() {
    if (this.orden == 1) {//Se ordenan los memes de mayor a menor en funcion de su fecha de creacion
      let auxiliar;
      for (let i = 0; i < this.memesCompletos.length; i++) {
        for (let a = 0; a < this.memesCompletos.length; a++) {
          let meme1 = this.memesCompletos[a];
          let meme2 = this.memesCompletos[a + 1];
          if (meme2 != undefined) {
            if (meme1.created_at < meme2.created_at) {
              auxiliar = this.memesCompletos[a];
              this.memesCompletos[a] = this.memesCompletos[a + 1];
              this.memesCompletos[a + 1] = auxiliar;
            }
          }
        }
      }
    }
    else if (this.orden == 2) {//Se ordenan los memes de menor a mayor en funcion de su fecha de creacion
      let auxiliar;
      for (let i = 0; i < this.memesCompletos.length; i++) {
        for (let a = 0; a < this.memesCompletos.length; a++) {
          let meme1 = this.memesCompletos[a];
          let meme2 = this.memesCompletos[a + 1];
          if (meme2 != undefined) {
            if (meme1.created_at > meme2.created_at) {
              auxiliar = this.memesCompletos[a];
              this.memesCompletos[a] = this.memesCompletos[a + 1];
              this.memesCompletos[a + 1] = auxiliar;
            }
          }
        }
      }
    }
    else if (this.orden == 3) {///Se ordenan los memes de mayor a menor en funcion de su promedio
      let auxiliar;
      for (let i = 0; i < this.memesCompletos.length; i++) {
        for (let a = 0; a < this.memesCompletos.length; a++) {
          let meme1 = this.memesCompletos[a];
          let meme2 = this.memesCompletos[a + 1];
          if (meme2 != undefined) {
            if (meme1.promedio < meme2.promedio) {
              auxiliar = this.memesCompletos[a];
              this.memesCompletos[a] = this.memesCompletos[a + 1];
              this.memesCompletos[a + 1] = auxiliar;
            }
          }
        }
      }
    }
    else if (this.orden == 4) {//Se ordenan los memes de mayor a menor en funcion de su promedio
      let auxiliar;
      for (let i = 0; i < this.memesCompletos.length; i++) {
        for (let a = 0; a < this.memesCompletos.length; a++) {
          let meme1 = this.memesCompletos[a];
          let meme2 = this.memesCompletos[a + 1];
          if (meme2 != undefined) {
            if (meme1.promedio > meme2.promedio) {
              auxiliar = this.memesCompletos[a];
              this.memesCompletos[a] = this.memesCompletos[a + 1];
              this.memesCompletos[a + 1] = auxiliar;
            }
          }
        }
      }
    }
    this.cargarMemes();
  }

  cargarMemes() {//Esta funcion se usa para colocar en pantalla los memes ordenados
    this.memes = [];//Se limpia la pantalla
    var fin = this.cantidadMemes;
    if (this.memesCompletos.length < fin) {
      fin = this.memesCompletos.length;
      if (this.infinity != undefined) {
        this.infinity.enable(false);
      }
    }
    for (var i = 0; i < fin; i++) {
      this.memes.push(this.memesCompletos[i]);
    }
  }
}
