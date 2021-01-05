import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../player.service';
import { Player } from '../player';
import { TranslateService } from '@ngx-translate/core';

/**
 * Represents welcome view of the app
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  player: Player;
  players: Player[];

  /**
   * Injecting player service for communication purpose
   * @param playerService - player communication service to be used
   */
  constructor(
    private playerService: PlayerService,
    public translate: TranslateService) {
      translate.setDefaultLang('en');
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
   }
  
  /**
   * Calls for getPlayers() method on component initialization
   */
  ngOnInit() {
    this.getPlayers();
  }

  /**
   * Gets players list from the server;
   * Can be used to redirect to landing page if list already contains two players
   */
  getPlayers(): void {
    this.playerService.getPlayers()
    .subscribe(players => this.players = players);
  }

  /**
   * Adds new player to the list and sends the player to the server
   * @param name - player name
   */
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.playerService.addPlayer({name} as Player)
                      .subscribe(player => {this.players.push(player);});
  }
}
