import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  static TYPES: any = { INFO: 'info', WARNING: 'warning', QUESTION: 'question', ERROR: 'error' };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  confirm(): void {
    if (this.data.onConfirmation) {
      this.data.onConfirmation();
    }
  }

  types(): any {
    return AlertComponent.TYPES;
  }
}
