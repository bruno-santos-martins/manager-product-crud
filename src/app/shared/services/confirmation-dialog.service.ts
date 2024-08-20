import { Component, inject, Inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Product } from '../interfaces/product.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar Prudoduto ?</h2>
    <mat-dialog-content>
      você deletará o produto <strong>{{ data.title }}</strong>.
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-flat-button (click)="onCancel()">Cancelar</button>
      <button mat-flat-button color="warn" (click)="onConfirm()">Confirmar</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})


export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  matDialog = inject(MatDialog);

  constructor() { }

  openDialog(product: Product) {

    const enterAnimationDuration = 0;
    const exitAnimationDuration = 0;

    return this.matDialog.open(ConfirmationDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: product
    })
      .afterClosed()
      .pipe(filter((answer: boolean) => answer === true));
  }
}
