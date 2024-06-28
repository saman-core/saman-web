import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlertModule } from '@saman-core/core';
import { WorkflowComponent } from './workflow/workflow.component';

@NgModule({
  declarations: [
    WorkflowComponent,
  ],
  imports: [
    CommonModule,
    AlertModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  exports: [WorkflowComponent],
})
export class WorkflowModule {}
