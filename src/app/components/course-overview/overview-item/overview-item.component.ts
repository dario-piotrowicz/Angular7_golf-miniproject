import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-overview-item',
  templateUrl: './overview-item.component.html',
  styleUrls: ['./overview-item.component.css']
})
export class OverviewItemComponent implements OnInit {

  @Input() player: Player;

  constructor() { }

  ngOnInit() {
  }

}
