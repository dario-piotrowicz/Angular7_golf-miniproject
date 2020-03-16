import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
         MatDividerModule,
         MatFormFieldModule,
         MatInputModule,
         MatIconModule } from '@angular/material';

const modules = [
         BrowserAnimationsModule,
         MatButtonModule,
         MatDividerModule,
         MatFormFieldModule,
         MatInputModule,
         MatIconModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class AngularMaterialModule { }
