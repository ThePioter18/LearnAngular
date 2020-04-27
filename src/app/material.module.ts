import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatDialogModule,
    MAT_DIALOG_DATA,
    MatIconModule, MatMenuModule,
    MatCardModule, MatDividerModule,
    MatListModule, MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatStepperModule,
    MatDialogRef
} from '@angular/material';

const myMaterialModule = [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    MatStepperModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
];

@NgModule({
    imports: [CommonModule, myMaterialModule],
    exports: [myMaterialModule],
    providers: [
        {
            provide: MatDialogRef,
            useValue: {}
        },
        {
            provide: MAT_DIALOG_DATA,
            useValue: {}
        }
    ],
    declarations: []
})
export class MaterialModule { }
