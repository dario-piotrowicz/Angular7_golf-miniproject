import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CourseOverviewComponent } from './components/course-overview/course-overview/course-overview.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'courseoverview/:courseId', component: CourseOverviewComponent },
  { path: 'courseoverview/:courseId/editplayer', component: EditPlayerComponent },
  { path: 'courseoverview/:courseId/editplayer/:playerId', component: EditPlayerComponent },
  { path: '**', component: PageNotFoundComponent } ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
