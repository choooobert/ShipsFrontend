import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { PlayerService } from '../player.service';
import { Player } from '../player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  player: Player;
  players: Player[];
  error_message:string;

  constructor(private playerService: PlayerService, 
    private router: Router) { }

  ngOnInit() {
    this.getPlayers();
    this.error_message = ""; 
    }

  getPlayers(): void {
    this.playerService.getPlayers()
    .subscribe(players => this.players = players);
  }

  add(name: string): void {
    name = name.trim();
    let id = this.players.length+1;
    if (!name) { return; }
    this.playerService.addPlayer({name} as Player)
      .subscribe(
        player => {this.players.push(player);
        }, 
        error => { console.log(error); this.error_message = error;},
        () => {
          this.router.navigate(['/waiting-room'])});
  }

}
