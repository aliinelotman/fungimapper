import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  type: string = '';
  description: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    this.dialogRef.close({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      type: this.type,
      description: this.description,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
