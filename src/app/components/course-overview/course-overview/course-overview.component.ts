import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {

  public course$: Observable<Course>;
  private currentCourse: Course = null;
  private routeCourseId: string = null;

  public showScores = false;

  constructor(private route: ActivatedRoute, private router: Router, private store: StoreService) {
    this.course$ = store.getState();
    this.course$.subscribe( change => console.log('NGRX CHANGE', change ) );
   }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.routeCourseId = paramMap.get('courseId');
      this.redirectIfIncorrectCourseId();
    });
    this.course$.subscribe( (course) => {
      this.currentCourse = course;
      this.redirectIfIncorrectCourseId();
    });
  }

  public deletePlayer(id: string): void {
    this.store.deletePlayer(id);
  }

  private redirectIfIncorrectCourseId(): void {
    if ( this.currentCourse && this.currentCourse.id !== this.routeCourseId) {
      // TODO: handle this better if there will be time, not it simply redirects to 404
      this.router.navigate(['/404']);
    }
  }


}
