import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {

  private course$: Observable<Course>;
  private currentCourse: Course = null;
  private routeCourseId: string = null;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) {
    this.course$ = store.select('course');
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

  private redirectIfIncorrectCourseId(): void {
    if ( this.currentCourse && this.currentCourse.id!==this.routeCourseId) {
      // TODO: handle this better if there will be time, not it simply redirects to 404
      this.router.navigate(['/404']);
    }
  }


}
