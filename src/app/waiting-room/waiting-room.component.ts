import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../player.service';
import { Player } from '../player';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Represents waiting room view, on which we can see player name if only one have joined.
 */
@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  private MAX_NUMBER_OF_PLAYERS_IN_ROOM: number = 2;
  private subscription: Subscription;
  private sessionPlayer: Player;
  playersInRoom: Player[];

  /**
   * Injecting player service for communication purpose and initializing empty players list.
   * @param playerService - player communication service to be used
   */
  constructor(
    private playerService: PlayerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.playersInRoom = [];
    this.sessionPlayer = { name: this.activatedRoute.snapshot.paramMap.get('name') } as Player;
  }

  ngOnInit() {
    this.subscription = timer(0, 2000)
    .pipe(switchMap(() => this.playerService.getPlayers()))
    .subscribe(playersInRoom => this.assignPlayersInRoom(playersInRoom));
  }

  ngOnDestroy() {
    console.log("Destroy!");
    this.subscription.unsubscribe();
  }

  private assignPlayersInRoom(playersInRoom: Player[]) {
    this.playersInRoom = playersInRoom;
    if (this.MAX_NUMBER_OF_PLAYERS_IN_ROOM == playersInRoom.length) {
      this.router.navigate(['/game/' + this.sessionPlayer.name]);
    }
  }

}
