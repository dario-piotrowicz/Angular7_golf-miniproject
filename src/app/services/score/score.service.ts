import { Injectable } from '@angular/core';
import { Hole } from '../../models/hole.model';
import { Stroke } from 'src/app/models/player.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private computeStablefordPoints(strokes: number, par: number): number {
    if ( strokes === par ) {
      return 2;
    }
    if ( strokes < par ) {
      switch ( strokes ) {
        case par - 3 :
          return 5;
        case par - 2:
          return 4;
        case par - 1:
          return 3;
        default:
          return 6;
      }
    }
    if ( strokes === par + 1 ) {
      return 1;
    }
    return 0;
  }

  public computeScore( playerStrokes: Stroke[],
                       playerHandicap: number,
                       courseHoles: Hole[]): number {
    if ( !courseHoles ) {
      return -1;
    }
    let score = 0;
    const computePar = (hole: Hole): number => {
      const division = Math.floor( playerHandicap / courseHoles.length );
      const modulo = playerHandicap % courseHoles.length;
      return hole.par + division + (hole.idx <= modulo ? 1 : 0 );
    };
    courseHoles.forEach( hole => {
      const stroke = playerStrokes.find( s => s.holeNumber === hole.number );
      if ( stroke ) {
        score += this.computeStablefordPoints(stroke.numberOfStrokes, computePar(hole));
      }
    });
    return score;
  }
}
