import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pais } from 'src/app/model/pais';
import { Persona } from 'src/app/model/persona';
import { PaisService } from 'src/app/service/pais.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-persona-modal',
  templateUrl: './persona-modal.component.html',
  styleUrls: ['./persona-modal.component.css']
})
export class PersonaModalComponent implements OnInit {
  //llamar persona service
  persona: Persona;
  
  //llamar pais instanciarlo
  pais: Pais[];
  constructor(
    //referenciar
    private dialogRef: MatDialogRef<PersonaModalComponent>,
    private paisService: PaisService,
    private PersonaService: PersonaService,
    //crear insercion
    @Inject(MAT_DIALOG_DATA)private data: Persona){ }

  ngOnInit(): void {
    //llamar persona e instanciar
    this.persona = new Persona();
    this.persona.idPersona=this.data.idPersona;
    this.persona.nombres=this.data.nombres;
    this.persona.apellidos=this.data.apellidos;
    this.persona.edad=this.data.edad;
    this.persona.pais=this.data.pais;

    //llamar al servicio pais e instar
    this.paisService.listar().subscribe(data =>{
    this.pais=data;
    })
  }
  
  aceptar(){
    //seleccionar por id de persona
    if(this.persona !=null && this.persona.idPersona>0){
    this.PersonaService.editar(this.persona).subscribe(()=>{
      //programacion reactiva
      return this.PersonaService.listar().subscribe(data =>{
        this.PersonaService.personaActualizar.next(data);
      })
    })
  }else{
    this.PersonaService.registrar(this.persona).subscribe(()=>{
      this.PersonaService.listar().subscribe(data =>{
        //programacion reactiva
        this.PersonaService.personaActualizar.next(data);
      })
    })
  }
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }
}
