import { Injectable } from '@angular/core';
import { Hole } from '../../models/hole.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private computeStablefordPoints(strokes: number, par: number): number {
    if ( strokes === par ) {
      return 2;
    }
    if ( strokes < par ) {
      if ( strokes <= par - 4 ){
        return 6;
      }
      if ( strokes === par - 3 ) {
        return 5;
      }
      if ( strokes === par - 2 ) {
        return 4;
      }
      if( strokes === par - 1 ){
        return 3;
      }
    }
    if ( strokes === par + 1 ) {
      return 1;
    }
    return 0;
  }

  public computeScore(playerStrokes: number[], playerHandicap: number, courseHoles: Hole[]): number {
    if ( !playerStrokes || !courseHoles || playerStrokes.length !== courseHoles.length) {
      return -1;
    }
    let score = 0;
    const computePar = (hole: Hole): number => {
      const division = Math.floor( playerHandicap / courseHoles.length );
      const modulo = playerHandicap % courseHoles.length;
      return hole.par + division + (hole.idx <= modulo ? 1 : 0 );
    }
    courseHoles.forEach( (hole, index) => {
      score += this.computeStablefordPoints(playerStrokes[index], computePar(hole));
    });
    return score;
  }
}
