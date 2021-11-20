//servicio para consumir nuestro servidor API

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../model/persona';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  //programacion reactiva
  personaActualizar= new Subject<Persona[]>();
  //crear nuestra ruta
  private url: string = 'http://localhost:8080/personas';
  //crear http
  constructor(private http: HttpClient) { }

    //crear metodo para llegar a la ruta
    listar(){
      return this.http.get<Persona[]>(this.url);
    }
    //aqui se agregan los servicios 
    eliminar(id:number){
      //alt+96 comillas invertidas
      return this.http.delete(`${this.url}/${id}`);
    }
    editar(persona:Persona){
      return this.http.put(this.url, persona);
    }
    registrar(persona:Persona){
      return this.http.post(this.url, persona);
    }
  }

