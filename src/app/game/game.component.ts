import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Player } from '../player';
import { MessageService } from '../messages.service';
import { Square } from '../square';
import { GameService } from '../game.service';
import { ShootMapCellStatus } from '../shoot-map-cell-status';
import { ShipMapCellStatus } from '../ship-map-cell-status';
import { PlayerService } from '../player.service';
import { NotificationService } from '../notification.service';
import { NotificationMessage, NotificationType } from '../notification.message';


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

  player: Player = {name : ''};
  opponent: Player = {name : ''};
  playerTurn : Player = {name : ''};

  shipMap: Square[] = [];
  shootMap: Square[] = [];

  isPlayersTurn : boolean;

  shootNotification: NotificationMessage;
  braceNotification: NotificationMessage;
  hitNotification: NotificationMessage;
  missNotification: NotificationMessage;

  /**
   * Using injection route, and player and message services
   * @param messageService - messaging service used to provide messages on the website
   * @param route - allows to verify player by id using the url which opened the game
   */
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private playerService: PlayerService,
    public messageService: MessageService,
    private notificationService: NotificationService,
    ) {
      this.shootNotification = {
        message: 'Your turn. Shoot!',
        type: NotificationType.info}

      this.braceNotification = {
        message: 'Brace yourself!',
        type: NotificationType.info}

      this.hitNotification = {
        message: 'Hit!',
        type: NotificationType.success}
      
      this.missNotification = {
        message: 'Miss!',
        type: NotificationType.error}
     }

  /**
   * Calls for getPlayer() method on component initialization
   */
  ngOnInit(): void {

    this.getPlayer();
    this.getOpponent();
    this.getShootMap();
    this.getShipMap();

    for (let i = 1; i <=100; i++) {
      this.shipMap.push({id : i, status : 0, taken :true});
      this.shootMap.push({id : i, status : 0, taken :true});
    }
  }

  private getPlayer(): void{
    const name :string = this.route.snapshot.paramMap.get('name');
    this.player = {name};
    console.log(`player name is ${name}`);
  }

  private getOpponent(): void{
    this.playerService.getPlayers()
    .subscribe(
      players => {
        this.opponent = players[(players.findIndex(player => {player.name === this.player.name})+1)%2];
        console.log(`player's opponent is ${this.opponent.name}`);
      }
    );
  }

  /**
   * Assigns player based on the url route
   */
  private getShootMap(): void {
     this.gameService.getShootMap(this.player.name).subscribe(
       mapShootMap =>{ this.shootMap = this.mapShootMapToArray(mapShootMap)}
     );
  }

  private getShipMap(): void {
    this.gameService.getShipMapWithRoundInfo(this.player.name).subscribe(
      mapShipMapWithInfo =>{ this.shootMap = this.mapShipMapToArray(mapShipMapWithInfo.shipMap);
        this.isPlayersTurn = mapShipMapWithInfo.isPlayerTurn;
       this.playerTurn =  this.isPlayersTurn ? this.player : this.opponent; 
      }
    );
 }

  private mapShootMapToArray(shipMap : Map<number, ShootMapCellStatus>) : Square[]{
    let squares : Square[];
    for (let i = 1; i <=100; i++) {
      squares.push({id : i, status : 0, taken :false});
    }
    for(let entry of shipMap.entries()){
      squares[entry[0]] = {id : entry[0]+1,
         status : entry[1] === ShootMapCellStatus.SHOOT_MAP_MISS ? 2 :1,
          taken :true};
    }
    return squares;
  }

  private mapShipMapToArray(shipMap : Map<number, ShipMapCellStatus>) : Square[]{
    let squares : Square[];
    for (let i = 1; i <=100; i++) {
      squares.push({id : i, status : 0, taken :false});
    }

    for(let entry of shipMap.entries()){
      squares[entry[0]] = {id : entry[0]+1,
         status : entry[1] === ShipMapCellStatus.SHIP_MAP_MISS ? 2 :
         entry[1] === ShipMapCellStatus.SHIP_MAP_SHIP ? 3 :1,
          taken :true};
    }
    return squares;
  }


    /**
   * @param id - square identification number
   */
  changeStatus(id: number): void {
    let cellStatus : ShootMapCellStatus;
    this.gameService.shootPlayer(this.player.name, this.opponent.name, id-1)
      .subscribe(shootResponse =>{ 
        cellStatus = shootResponse.shootMapCellStatus
        console.log("Changing cell status");
        const currentButton = this.shootMap[id - 1];
        console.log("Before: ", currentButton.status);
        if(cellStatus === ShootMapCellStatus.SHOOT_MAP_SHIP_HIT) {
          currentButton.status = 1;
          this.showMessage(this.shootNotification);
          this.showMessage(this.hitNotification);
          this.isPlayersTurn = true;
          this.playerTurn = this.player;
        } else if(cellStatus === ShootMapCellStatus.SHOOT_MAP_MISS){
          currentButton.status = 2;
          this.showMessage(this.braceNotification);
          this.showMessage(this.missNotification);
          this.isPlayersTurn = false;
          this.playerTurn = this.opponent;
        }
        console.log("After: ", this.shootMap[id-1].status);
    });
  }


  showMessage(message: NotificationMessage) {
    this.notificationService.sendMessage(message);
  }
}
