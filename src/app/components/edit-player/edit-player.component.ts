import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as GolfActions from '../../store/golf.actions';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {

  public courseId = '18A';

  public playerName: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  public addPlayer(): void {
    const fakePlayer: Player = {
      id: `player_${new Date().getTime()}`,
      name: this.playerName,
      handicap: 0,
      strokes: []
    };
    this.store.dispatch(
      new GolfActions.AddPlayer(fakePlayer)
    );
  }
}
