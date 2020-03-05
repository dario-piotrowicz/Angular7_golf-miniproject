import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app-component/app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CourseOverviewComponent } from './components/course-overview/course-overview.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { StoreModule } from '@ngrx/store';
import { CourseReducer } from './store/course.reducer';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CourseOverviewComponent,
    EditPlayerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      course: CourseReducer
    }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
