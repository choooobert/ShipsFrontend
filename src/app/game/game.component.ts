import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Player } from '../player';
import { PlayerService } from '../player.service';
import { MessageService } from '../messages.service';

/**
 * Represents game view of the app, contains map components in:
 * @see game.component.html
 */
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  player: Player;

  /**
   * Using injection route, and player and message services
   * @param messageService - messaging service used to provide messages on the website
   * @param playerService - player service used to get information about the player from the route
   * @param route - allows to verify player by id using the url which opened the game
   */
  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    public messageService: MessageService,
  ) { }

  /**
   * Calls for getPlayer() method on component initialization
   */
  ngOnInit(): void {
    this.getPlayer();
  }

  /**
   * Assigns player based on the url route
   */
  getPlayer(): void {
    const name :string = this.route.snapshot.paramMap.get('name');
    this.playerService.getPlayer(name)
        .subscribe(player => this.player = player);
  }
}
