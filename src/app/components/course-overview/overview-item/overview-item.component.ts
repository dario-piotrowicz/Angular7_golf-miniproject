import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-overview-item',
  templateUrl: './overview-item.component.html',
  styleUrls: ['./overview-item.component.css']
})
export class OverviewItemComponent {

  @Input() player: Player;
  @Input() showScores = false;
  @Output() deletePlayer = new EventEmitter<string>();
  @Output() editPlayer = new EventEmitter<string>();
}
