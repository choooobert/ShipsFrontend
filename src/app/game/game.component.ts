import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Player } from '../player';
import { PlayerService } from '../player.service';
import { MessageService } from '../messages.service';
import { TranslateService } from '@ngx-translate/core';

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
    public translate: TranslateService) {
      translate.setDefaultLang('en');
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
   }

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
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayer(id)
        .subscribe(player => this.player = player);
  }
}
