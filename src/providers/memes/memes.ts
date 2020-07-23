import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {apiUrl} from "../../app/global";
import {Observable} from "rxjs/Observable";

const httpOptions_ = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class MemesProvider {

  constructor(public http: HttpClient) {

  }
  memes(data): Observable<any> {
    return this.http.post(apiUrl + "verMemes",JSON.stringify(data),httpOptions_);
  }

  subir(data): Observable<any> {
    return this.http.post(apiUrl + "nuevoMeme", JSON.stringify(data),httpOptions_);
  }

  verMeme(id): Observable<any> {
    return this.http.get(apiUrl + "meme/" + id);
  }

  nuevoComentario(data): Observable<any> {
    return this.http.post(apiUrl + "nuevocomentario", JSON.stringify(data),httpOptions_);
  }

  comentariosM(id): Observable<any> {
    return this.http.get(apiUrl + "verComentarios/" + id);
  }
}
