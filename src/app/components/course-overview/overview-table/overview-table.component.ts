import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.css']
})
export class OverviewTableComponent implements OnInit {

  @Input() course: Course;

  constructor() { }

  ngOnInit() {
  }

}
