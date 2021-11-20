import { Component, OnInit } from '@angular/core';
//importar dialogo de angular material
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    //llamarlo
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit(): void {
  }
  
    //llamar eventos
    onElimiar(){
      this.dialogRef.close(true);
    }
    onCancelar(){
      this.dialogRef.close(false);
    }
}
