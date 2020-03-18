import { Component, OnInit } from '@angular/core';
import { Player, Stroke } from 'src/app/models/player.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ScoreService } from 'src/app/services/score/score.service';
import { Hole } from 'src/app/models/hole.model';
import { StoreService } from 'src/app/store/store.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {

  public course: Course;
  public playerName: string;
  public form: FormGroup;
  public holesFormGroup: FormGroup;
  public holesFormControlNames: string[];

  public nameFormControlName = 'name';
  public handicapFormControlName = 'handicap';
  public holesFormGroupName = 'holes';

  public existingPlayerId: string;

  private numberRegexPattern = /^\d+$/;

  constructor( private store: StoreService,
               private route: ActivatedRoute,
               private router: Router,
               private fb: FormBuilder,
               private scoreService: ScoreService) {
    store.getState().pipe(take(1)).subscribe( course => {
      this.course = course;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.existingPlayerId = paramMap.get('playerId');
      if ( this.existingPlayerId ) {
        this.buildPrePopulatedForm(this.existingPlayerId);
      } else {
        this.buildForm(this.course.holes.length);
      }
    });
  }

  public addPlayer(): void {
    this.savePlayerToStore();
  }

  public editPlayer(): void {
    this.savePlayerToStore(false);
  }

  private savePlayerToStore(isNewPlayer: boolean = true): void {
    const id = `player_${new Date().getTime()}`;
    const name = this.form.controls[this.nameFormControlName].value;
    const handicap = this.form.controls[this.handicapFormControlName].value ? this.form.controls[this.handicapFormControlName].value : 0;
    const strokes: Stroke[] = [];
    this.holesFormControlNames.forEach( (hFormCname, i) => {
      const strkVal = this.holesFormGroup.controls[hFormCname].value;
      if ( strkVal ) {
        strokes.push({
          holeNumber: i + 1,
          numberOfStrokes: strkVal
        });
      }
    });
    const score = this.scoreService.computeScore(strokes, handicap, this.course.holes);
    const player: Player = { id, name, handicap, strokes, score };
    if ( isNewPlayer ){
      this.store.addPlayer(player);
    } else {
      player.id = this.existingPlayerId;
      this.store.editPlayer(player);
    }
    this.router.navigate(['/courseoverview/', this.course.id]);
  }

  private buildForm( numOfHoles: number,
                     defaultName: string = '',
                     defaultHandicap: string = '',
                     defaultStrokes: Stroke[] = null ): void {
    const holeControls = [];
    this.holesFormControlNames = [];
    const holeControlValidators = [
      Validators.pattern(this.numberRegexPattern),
      Validators.min(1)
    ];
    for (let i = 0 ; i < numOfHoles; i++ ) {
      const formControlName = `hole_${ i + 1 }`;
      this.holesFormControlNames.push(formControlName);
      const stroke = defaultStrokes ? defaultStrokes.find( strk => strk.holeNumber === i + 1 ) : null;
      const defaultValue = stroke ? stroke.numberOfStrokes : '';
      holeControls[formControlName] = [defaultValue, holeControlValidators ];
    }
    this.holesFormGroup = this.fb.group(holeControls);
    const formGroup = {};
    formGroup[this.nameFormControlName] = [defaultName, Validators.required];
    formGroup[this.handicapFormControlName] = [defaultHandicap, Validators.pattern(this.numberRegexPattern)];
    formGroup[this.holesFormGroupName] = this.holesFormGroup;
    this.form = this.fb.group(formGroup);
  }

  private buildPrePopulatedForm(playerId: string): void {
    const numOfHoles = this.course.holes.length;
    const originalPlayer = this.course.players.find( (player) => player.id === playerId );
    if ( originalPlayer ) {
      const name = originalPlayer.name;
      const handicapStr = originalPlayer.handicap.toString();
      this.buildForm(numOfHoles, name, handicapStr, originalPlayer.strokes);
    } else {
      // TODO: handle error greacefully
      this.buildForm(numOfHoles);
    }
  }
}
