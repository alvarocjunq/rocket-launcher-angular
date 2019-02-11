import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AlertComponent } from './alert.component';


@Injectable()
export class AlertService {
  constructor(public dialog: MatDialog) {}

  private getModalConfigurations(options: any): any {
    return Object.assign({}, {
      width: '500px',
      hasBackdrop: true,
      disableClose: false,
      data: {}
    }, options || {});
  }

  showInfo(title: string, text: string, onConfirmation?: () => void): void {
    this.dialog.open(AlertComponent,
      this.getModalConfigurations({data: {
        type: AlertComponent.TYPES.INFO,
        title, text, onConfirmation,
      }})
    );
  }

  showWarning(title: string, text: string, onConfirmation?: () => void): void {
    this.dialog.open(AlertComponent,
      this.getModalConfigurations({data: {
        type: AlertComponent.TYPES.WARNING,
        title, text, onConfirmation,
      }})
    );
  }

  showQuestion(title: string, text: string, onConfirmation?: () => void): void {
    this.dialog.open(AlertComponent,
      this.getModalConfigurations({data: {
        type: AlertComponent.TYPES.QUESTION,
        title, text, onConfirmation,
      }})
    );
  }

  showError(title: string, error: any, onConfirmation?: () => void): void {
    const text: string = this.parseError(error);
    this.dialog.open(AlertComponent,
      this.getModalConfigurations({data: {
        type: AlertComponent.TYPES.ERROR,
        title, text, onConfirmation,
      }})
    );
  }

  parseError(obj: any): string {
    // TODO: Improve this later with 'tables'. Dictionaries are sections, list are rows.

    if (typeof obj === 'string') {
      return obj;
    } else {
      if (Array.isArray(obj)) {
        return obj.map(item => this.parseError(item)).join(' ');
      } else {
        let error = '';

        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            error = `${error}${error ? '\n' : ''}${key}: ${this.parseError(obj[key])}`;
          }
        }

        return error;
      }
    }

    return 'Unknown error.';
  }
}
