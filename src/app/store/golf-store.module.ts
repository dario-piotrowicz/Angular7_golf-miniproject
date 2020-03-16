import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { CourseReducer } from './course.reducer';
import { StoreService } from './store.service';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      course: CourseReducer
    })
  ],
  providers: [ StoreService ]
})
export class GolfStoreModule { }
