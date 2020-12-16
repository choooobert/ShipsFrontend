import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../player.service';
import { Player } from '../player';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  player: Player;
  players: Player[];

  constructor(
    private playerService: PlayerService,
  ) {
    this.players = [];
  }

  ngOnInit(): void {
    this.getPlayers();
    
  }

  getPlayers(): void {
    this.playerService.getPlayers()
        .subscribe(players => this.players = players);
  }
}
