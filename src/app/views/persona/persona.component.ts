import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/service/persona.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PersonaModalComponent } from './persona-modal/persona-modal.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  


  //definir
  displayedColumns= ['idPersona','nombres','apellidos','edad','pais','editar-eliminar'];
  dataSource:MatTableDataSource<Persona>
  //llamar paginador
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //llamamr sort
  //crear una variable sort y clase MatSort
  @ViewChild(MatSort) sort:MatSort;
  //llamar persona
  //persona:Persona[];
  //crear servicio
  constructor(
    private dialog: MatDialog,
    private personaService: PersonaService
    ) { }

  ngOnInit(): void {
    //actualizacion cuando se ejecute aceptar
    this.personaService.personaActualizar.subscribe(data =>{
      this.dataSource= new MatTableDataSource(data);
      //poner paginator cada q se actualiza, 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;
    })
    //llamar servicio
    //suscribe se da cuenta lo q hace listar
    //funcion flecha =>
    //this.personaService.listar().subscribe(data => this.persona=data);
    this.personaService.listar().subscribe(data =>{
      this.dataSource= new MatTableDataSource(data);
      //poner paginator cada q se actualiza, 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;
    });
  }
  //opcional ?
  openModal(persona?:Persona){
    //instanciar si no hay data, instanciar una nueva perona
    let person= persona!=null ? persona:new Persona();
    this.dialog.open(PersonaModalComponent,{
      width:'260px',
      data:person
    })
  }

  onDelete(id:number){
    //llamar al dialog
    let dialogRef = this.dialog.open(ConfirmDialogComponent,{
      disableClose:true
    });
    //llamamos al parametro
    //funcion flecha =>
    /*el estado eliminara si es true 
    si esto es verdadero entonces persona del servicio 
    se elimina por el id, al momento de eliminar hay q listarlo 
    y suscribirnos
    al poner si vamos a eliminar
    */
    dialogRef.afterClosed().subscribe(estado =>{
      if(estado){
        this.personaService.eliminar(id).subscribe(()=>{
          this.personaService.listar().subscribe(data =>{
            this.dataSource = new MatTableDataSource(data);
          })
        })
      }
    })
  }
filtrar(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
