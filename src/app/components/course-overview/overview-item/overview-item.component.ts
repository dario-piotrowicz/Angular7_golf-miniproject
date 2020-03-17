import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Hole } from 'src/app/models/hole.model';

@Component({
  selector: 'app-overview-item',
  templateUrl: './overview-item.component.html',
  styleUrls: ['./overview-item.component.css']
})
export class OverviewItemComponent implements OnInit {

  @Input() player: Player;
  @Input() courseHoles: Hole[];
  @Input() showScores = false;
  @Output() deletePlayer = new EventEmitter<string>();
  @Output() editPlayer = new EventEmitter<string>();

  public strokesToDisplay: string[];

  ngOnInit() {
    this.strokesToDisplay = this.courseHoles.map(
      hole => {
        const stroke = this.player.strokes.find( strk => strk.holeNumber === hole.number );
        if ( stroke ) {
          return stroke.numberOfStrokes.toString();
        }
        return '?';
      }
    );
  }
}
