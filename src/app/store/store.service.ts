import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { Player } from '../models/player.model';
import * as GolfActions from './golf.actions';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private state$: Observable<Course>;

  constructor(private store: Store<AppState>) {
    this.state$ = store.select('course');
  }

  public getState(): Observable<Course> {
    return this.state$;
  }

  public addPlayer(player: Player): void {
    this.store.dispatch(
      new GolfActions.AddPlayer(player)
    );
  }

}
