import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../player.service';
import { Player } from '../player';
import { TranslateService } from '@ngx-translate/core';

/**
 * Represents waiting room view, on which we can see player name if only one have joined.
 */
@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  player: Player;
  players: Player[];

  /**
   * Injecting player service for communication purpose and initializing empty players list.
   * @param playerService - player communication service to be used
   */
  constructor(
    private playerService: PlayerService,
    public translate: TranslateService) {
      this.players = [];
  }

  /**
   * Calls for getPlayers() method on component initialization
   */
  ngOnInit(): void {
    this.getPlayers();
  }

  /**
   * Gets players list from the server;
   * Can be used to redirect to game view directly if list contains two players
   */
  getPlayers(): void {
    this.playerService.getPlayers()
        .subscribe(players => this.players = players);
  }
}
