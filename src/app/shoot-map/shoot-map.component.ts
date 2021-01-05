import { Component, OnInit, Input} from '@angular/core';
import { MessageService } from '../messages.service';
import { GameService } from '../game.service';
import { NotificationMessage, NotificationType } from '../notification.message';
import { NotificationService } from '../notification.service';
import { Square } from '../square';
import { ShootMapCellStatus } from '../shoot-map-cell-status';
import { PlayerService } from '../player.service';

/**
 * Represents players shoot-map with his/her hits and misses.
 */
@Component({
  selector: 'app-shoot-map',
  templateUrl: './shoot-map.component.html',
  styleUrls: ['./shoot-map.component.css']
})
export class ShootMapComponent implements OnInit {
  
  map: Square[];
  shootNotification: NotificationMessage;
  braceNotification: NotificationMessage;
  hitNotification: NotificationMessage;
  missNotification: NotificationMessage;
  @Input() player :string = '';
  opponent : string;

  /**
  * Using injection of map service to be used as REST request service
  * @param shootMapService - request service for map queries
  */
  constructor(
    public messageService: MessageService,
    private gameService: GameService,
    private playerService : PlayerService,
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
  * Calls for getShipMapGrid() method on component initialization
  */
  ngOnInit(): void {
    this.getShootMap();
    this.getOpponent();
  }

  /**
  * Updates local array representation of squares
  */
  getShootMap(): void {
    this.gameService.getShootMap(this.player)
    .subscribe(shootMap => this.map = this.mapShootMapToArray(shootMap));
  }


  getOpponent(): void{
    this.playerService.getPlayers()
    .subscribe(
      players => {
        this.opponent = players[(players.indexOf({name: this.player})+1)%2].name;
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

  /**
   * @param id - square identification number
   */
  changeStatus(id: number): void {
    let cellStatus : ShootMapCellStatus;
    this.gameService.shootPlayer(this.player, this.opponent, id-1)
        .subscribe(shootResponse =>{ cellStatus = shootResponse.shootMapCellStatus})
    console.log("Changing cell status");
    const currentButton = this.map[id - 1];
    console.log("Before: ", currentButton.status);
    if(cellStatus === ShootMapCellStatus.SHOOT_MAP_SHIP_HIT) {
      currentButton.status = 1;
      this.showMessage(this.shootNotification);
      this.showMessage(this.hitNotification);
    } else if(cellStatus === ShootMapCellStatus.SHOOT_MAP_MISS){
      currentButton.status = 2;
      this.showMessage(this.braceNotification);
      this.showMessage(this.missNotification);
    }
    console.log("After: ", this.map[id-1].status);
  }

  /**
   * Displays toast notifications
   */
  showMessage(message: NotificationMessage) {
    this.notificationService.sendMessage(message);
  }

}