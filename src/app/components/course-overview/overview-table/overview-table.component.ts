import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.css']
})
export class OverviewTableComponent {

  @Input() course: Course;
  @Input() showScores = false;
  @Output() deletePlayer = new EventEmitter<string>();
  @Output() editPlayer = new EventEmitter<string>();
}
