import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PerfilPage} from "../pages/perfil/perfil";
import {MemesProvider} from '../providers/memes/memes';
import {HttpClientModule} from "@angular/common/http";
import {SubirMemePage} from "../pages/subir-meme/subir-meme";
import {LoginPage} from "../pages/login/login";
import {SesionProvider} from '../providers/sesion/sesion';
import {ImagePicker} from "@ionic-native/image-picker";
import {RegistroPage} from "../pages/registro/registro";
import {VerMemePage} from "../pages/ver-meme/ver-meme";
import {NuevoComentarioPage} from "../pages/nuevo-comentario/nuevo-comentario";
@NgModule({
  declarations: [
    MyApp,
    PerfilPage,
    SubirMemePage,
    HomePage,
    LoginPage,
    RegistroPage,
    VerMemePage,
    NuevoComentarioPage,
    TabsPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PerfilPage,
    HomePage,
    LoginPage,
    VerMemePage,
    NuevoComentarioPage,
    RegistroPage,
    SubirMemePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    ImagePicker,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MemesProvider,
    SesionProvider
  ]
})
export class AppModule {
}
