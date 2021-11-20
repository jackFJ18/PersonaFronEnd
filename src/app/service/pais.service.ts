import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../model/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  //crear nuestra ruta
  private url: string = 'http://localhost:8080/pais';
  constructor(private http: HttpClient) { }

    //crear metodo para llegar a la ruta
    listar(){
      return this.http.get<Pais[]>(this.url);
    }
}
