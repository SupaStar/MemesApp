import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {apiUrl} from "../../app/global";

const httpOptions_ = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "Bearer "
  })
};
@Injectable()
export class SesionProvider {

  constructor(public http: HttpClient) {

  }

  iniciarSesion(data): Observable<any> {
    return this.http.post(apiUrl + "login", JSON.stringify(data),httpOptions_);
  }

  registro(data): Observable<any> {
    return this.http.post(apiUrl + "nuevoUsuario", JSON.stringify(data),httpOptions_);
  }

  verPerfil(id): Observable<any> {
    return this.http.get(apiUrl + "verUsuario/" + id);
  }

  memesUsu(id): Observable<any> {
    return this.http.get(apiUrl + "verMemesUsuario/" + id);
  }
}
