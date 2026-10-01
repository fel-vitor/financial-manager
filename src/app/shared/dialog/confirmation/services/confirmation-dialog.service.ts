import { inject, Service } from '@angular/core';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { DialogData } from '../interfaces/dialog-data';

@Service()
export class ConfirmationDialogService {
  private dialog = inject(MatDialog);

  open(data: DialogData) {
    return this.dialog
      .open(ConfirmationDialogComponent, {
        data,
      })
      .afterClosed()
      .pipe(filter((response: boolean) => response === true));
  }
}
