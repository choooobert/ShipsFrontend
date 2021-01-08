import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Player } from '../player';
import { PlayerService } from '../player.service';
import { Square } from '../square';
import { GameService } from '../game.service';
import { ShootMapCellStatus } from '../shoot-map-cell-status.enum';
import { ShipMapCellStatus } from '../ship-map-cell-status.enum';
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
  playerTurn : Player = {name : ''};
  private opponent: Player = {name : ''};

  private subscription: Subscription;

  private isGameSetToPLayersTurn : boolean = false;
  private isFirstRound : boolean = true;


  shipMap: Square[] = [];
  shootMap: Square[] = [];

  hitMessage: string;
  missMessage: string;
  turnMessage: string;
  enemyTurnMessage: string;

  /**
   * Using injection route, and player and message services
   * @param messageService - messaging service used to provide messages on the website
   * @param playerService - player service used to get information about the player from the route
   * @param route - allows to verify player by id using the url which opened the game
   */
  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    public gameService: GameService,
    private notificationService: NotificationService,
    public translate: TranslateService) {
      this.hitMessage = 'TOAST.HIT';
      this.missMessage = 'TOAST.MISS';
      this.turnMessage = 'TOAST.YOUR_TURN';
      this.enemyTurnMessage = 'TOAST.ENEMY_TURN';
   }

  /**
   * Calls for getPlayer() method on component initialization
   */
  ngOnInit(): void {
    this.getPlayer();
    this.getOpponent();
    this.initializeEmptyMaps();
    this.getShootMap();
    this.getShipMap();

    this.subscription = timer(0, 2000)
    .pipe(switchMap(() => this.gameService.getCurrentGameStatus()))
    .subscribe( currentGameStatus => {
       //YOUR TURN
        if(currentGameStatus.playerNameWhoMoves == this.player.name && !currentGameStatus.isPlayerLooser){
          if(!this.isGameSetToPLayersTurn)
          {
            this.showMessage(this.turnMessage, NotificationType.info);
            this.getShipMap();
            this.unlockAllShotSquares();
            this.isGameSetToPLayersTurn = true;
          }
        }
        //OPPONENT'S TURN
        else if(currentGameStatus.playerNameWhoMoves == this.opponent.name && !currentGameStatus.isPlayerLooser){
          this.blockAllShotSquares();
          this.isGameSetToPLayersTurn = false;
          if(this.isFirstRound){
            this.showMessage(this.enemyTurnMessage, NotificationType.info);
            this.isFirstRound = false;
          }
        }
        //YOU WIN BECAUSE OPPONENT LEFT
        else if(currentGameStatus.playerNameWhoMoves == this.opponent.name && currentGameStatus.isPlayerLooser){
        }

        else if(currentGameStatus.playerNameWhoMoves == this.player.name && currentGameStatus.isPlayerLooser){
          //OPPONENT WINS
        }
        this.playerTurn = {name : currentGameStatus.playerNameWhoMoves};
    } );
  }

  private initializeEmptyMaps() : void{
    for (let i = 1; i <=100; i++) {
      this.shipMap.push({id : i, status : 0});
      this.shootMap.push({id : i, status : 0});
    }
  }

  /**
   * Assigns player based on the url route
   */
  private getPlayer(): void{
    const name :string = this.route.snapshot.paramMap.get('name');
    this.player = {name};
    console.log(`player name is ${name}`);
  }

  private getOpponent(): void{
    this.playerService.getPlayers()
    .subscribe(
      players => {
        let playerIndex : number =-1;
        for(let index in [0 , 1]){
          if(players[parseInt(index)].name != this.player.name){
            this.opponent = players[parseInt(index)];
          }
        }
      });
  }

  private getShootMap(): void {
    this.gameService.getShootMap(this.player.name).subscribe(
      mapShootMap =>{ this.mapShootMapToArray(mapShootMap)}
    );
 }

 private getShipMap(): void {
   this.gameService.getShipMap(this.player.name).subscribe(
     mapShipMap =>{ this.mapShipMapToArray(mapShipMap);}
   );
}

 private mapShootMapToArray(shootMap : Map<number, ShootMapCellStatus>) : void{
   Object.keys(shootMap).forEach(key => {
     this.shootMap[key] = {id : parseInt(key)+1,
        status : shootMap[key] === ShootMapCellStatus.SHOOT_MAP_MISS ? 2 :1};
     });
 }

 private mapShipMapToArray(shipMap : Map<number, ShipMapCellStatus>) : void{
   Object.keys(shipMap).forEach( key => {
     this.shipMap[key] = {id : parseInt(key)+1,
        status : shipMap[key] === ShipMapCellStatus.SHIP_MAP_MISS ? 2 :
        shipMap[key] === ShipMapCellStatus.SHIP_MAP_SHIP ? 3 :1};
       });
     }  

  /**
   * Changes square status depanding on ship/no ship found - implemantation to be updated (map can only hold statuses hit or miss);
   * Logic to be moved to backend.
   * @param id - square identification number
   */
  changeStatus(id: number): void {
    if(this.shootMap[id - 1].status != 0){
      return;
    }
    this.gameService.shootPlayer(this.player.name, this.opponent.name, id-1)
      .subscribe(shootResponse =>{
        let cellStatus : ShootMapCellStatus = shootResponse.shootMapCellStatus;
        console.log("Changing cell status");
        const currentButton = this.shootMap[id - 1];
        console.log("Before: ", currentButton.status);
        if(cellStatus === ShootMapCellStatus.SHOOT_MAP_SHIP_HIT) {
          currentButton.status = 1;
          this.showMessage(this.turnMessage, NotificationType.info);
          this.showMessage(this.hitMessage, NotificationType.success);
          this.playerTurn = this.player;
        } else if(cellStatus === ShootMapCellStatus.SHOOT_MAP_MISS){
          currentButton.status = 2;
          this.showMessage(this.enemyTurnMessage, NotificationType.info);
          this.showMessage(this.missMessage, NotificationType.error);
          this.playerTurn = this.opponent;
          this.blockAllShotSquares();
        }
        this.shootMap[id-1] = currentButton;
        console.log("After: ", this.shootMap[id-1].status);
    });
  }

  /**
   * Calls toast service to send notification
   */
  showMessage(message: string, type: NotificationType) {
    this.translate
        .get(message)
        .subscribe((msg: string) => {this.notificationService.print(msg, type)});
  }

  blockAllShotSquares() : void{
    for(let square of this.shootMap){
        square.status = square.status === 0 ? 4 : square.status;
    }
  }

  unlockAllShotSquares(): void{
    for(let square of this.shootMap){
      square.status = square.status === 4 ? 0 : square.status;
    }
  }
}
