import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as GolfActions from '../../store/golf.actions';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent {

  public courseId: string;
  public playerName: string;
  public form: FormGroup;
  public holesFormGroup: FormGroup;
  public holesFormControlNames: string[];

  constructor(private store: Store<AppState>, private router: Router, private fb: FormBuilder) {
    store.select('course').pipe(take(1)).subscribe( course => {
      this.courseId = course.id;
      this.buildForm(course.holes.length);
    });
  }

  private buildForm(numOfHoles: number): void {
    const holeControls = [];
    this.holesFormControlNames = [];
    for (let i = 0 ; i < numOfHoles; i++ ) {
      const formControlName = `hole_${ i + 1 }`;
      this.holesFormControlNames.push(formControlName);
      holeControls[formControlName] = [
                '',
                [
                  Validators.required,
                  Validators.pattern(/^\d+$/),
                  Validators.min(1)
                ]
      ];
    }
    this.holesFormGroup = this.fb.group(holeControls);
    this.form = this.fb.group({
      name: ['', Validators.required],
      handicap: ['', Validators.required],
      holes: this.holesFormGroup
    });
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
