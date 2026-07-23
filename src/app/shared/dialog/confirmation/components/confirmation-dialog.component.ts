import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogData } from '../interfaces/dialog-data';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>{{ resolvedDialogData().title }}</h2>
    <mat-dialog-content>{{ resolvedDialogData().message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button matButton [mat-dialog-close]="false">{{ resolvedDialogData().noBtnText }}</button>
      <button matButton [mat-dialog-close]="true" cdkFocusInitial>{{ resolvedDialogData().yesBtnText }}</button>
    </mat-dialog-actions>
  `,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class ConfirmationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);

  readonly dialogData = signal(inject<DialogData>(MAT_DIALOG_DATA));

  private defaultDialogData: Partial<DialogData> = {
    noBtnText: 'Não',
    yesBtnText: 'Sim',
  } 

  resolvedDialogData = computed(() => {
    return {
      ...this.defaultDialogData,
      ...this.dialogData(),
    }
  })
}
