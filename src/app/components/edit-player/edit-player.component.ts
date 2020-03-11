import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as GolfActions from '../../store/golf.actions';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ScoreService } from 'src/app/services/score/score.service';
import { Hole } from 'src/app/models/hole.model';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent {

  public courseId: string;
  private courseHoles: Hole[];
  public playerName: string;
  public form: FormGroup;
  public holesFormGroup: FormGroup;
  public holesFormControlNames: string[];

  public nameFormControlName = 'name';
  public handicapFormControlName = 'handicap';
  public holesFormGroupName = 'holes';

  constructor( private store: Store<AppState>,
               private router: Router,
               private fb: FormBuilder,
               private scoreService: ScoreService) {
    store.select('course').pipe(take(1)).subscribe( course => {
      this.courseId = course.id;
      this.courseHoles = course.holes;
      this.buildForm(course.holes.length);
    });
  }

  public addPlayer(): void {
    const id = `player_${new Date().getTime()}`;
    const name = this.form.controls[this.nameFormControlName].value;
    const handicap = this.form.controls[this.handicapFormControlName].value ? this.form.controls[this.handicapFormControlName].value : 0;
    const strokes = [];
    this.holesFormControlNames.forEach( hFormCname => {
      strokes.push(this.holesFormGroup.controls[hFormCname].value);
    });
    const score = this.scoreService.computeScore(strokes, handicap, this.courseHoles);
    const newPlayer: Player = { id, name, handicap, strokes, score };
    this.store.dispatch(
      new GolfActions.AddPlayer(newPlayer)
    );
    this.router.navigate(['/courseoverview/', this.courseId]);
  }

  private buildForm(numOfHoles: number): void {
    const holeControls = [];
    this.holesFormControlNames = [];
    const holeControlValidators = [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(1)
    ];
    for (let i = 0 ; i < numOfHoles; i++ ) {
      const formControlName = `hole_${ i + 1 }`;
      this.holesFormControlNames.push(formControlName);
      holeControls[formControlName] = ['', holeControlValidators ];
    }
    this.holesFormGroup = this.fb.group(holeControls);
    const formGroup = {};
    formGroup[this.nameFormControlName] = ['', Validators.required];
    formGroup[this.handicapFormControlName] = ['', Validators.pattern(/^\d+$/)];
    formGroup[this.holesFormGroupName] = this.holesFormGroup;
    this.form = this.fb.group(formGroup);
  }
}
