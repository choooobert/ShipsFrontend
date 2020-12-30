import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { PlayerService } from '../player.service';
import { Player } from '../player';

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
  error_message:string;

  /**
   * Injecting player service for communication purpose
   * @param playerService - player communication service to be used
   * @param router - router to be used
   */
  constructor(private playerService: PlayerService,
    private router: Router) { }

  
  /**
   * Calls for getPlayers() method on component initialization
   */
  ngOnInit() {
    this.getPlayers();
    this.error_message = ""; 
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
    this.playerService.addPlayer(name)
      .subscribe(
        player => {this.players.push(player);
        }, 
        error => { 
          console.log(error); 
          this.error_message = error;},
        () => {
          if(this.players.length === 2){
            let game_url  = '/game/' + name;
            this.router.navigate([game_url]);
          } else{
            this.router.navigate(['/waiting-room']);
          }
        });
  }

  delete(): void {
    this.playerService.deleteAllPlayers()
      .subscribe(
        player => {this.players = [];}, 
        error => { 
          console.log(error); 
          this.error_message = error;},
        () => {
          this.router.navigate(['/waiting-room']);
        });
  }
}
