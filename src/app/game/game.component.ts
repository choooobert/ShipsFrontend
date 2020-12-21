import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  player: Player;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    const name :string = this.route.snapshot.paramMap.get('name');
    this.playerService.getPlayer(name)
        .subscribe(player => this.player = player);
  }
}
