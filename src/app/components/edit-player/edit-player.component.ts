import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as GolfActions from '../../store/golf.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {

  public courseId: string;

  public playerName: string;

  constructor(private store: Store<AppState>, private router: Router) {
    store.select('course').subscribe( course => this.courseId = course.id );
  }

  ngOnInit() {
  }

  public addPlayer(): void {
    const fakePlayer: Player = {
      id: `player_${new Date().getTime()}`,
      name: this.playerName,
      handicap: 0,
      strokes: [ 1, 2, 3 ]
    };
    this.store.dispatch(
      new GolfActions.AddPlayer(fakePlayer)
    );
    this.router.navigate(['/courseoverview/', this.courseId]);
  }
}
