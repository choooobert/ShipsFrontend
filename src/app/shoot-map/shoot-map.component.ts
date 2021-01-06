import { Component, OnInit } from '@angular/core';
import { MessageService } from '../messages.service';
import { ShootMapService } from '../shoot-map.service';
import { NotificationType } from '../notification.message';
import { NotificationService } from '../notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Square } from '../square';

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

  hitMessage: string;
  missMessage: string;
  turnMessage: string;
  enemyTurnMessage: string;

  /**
  * Using injection of map service to be used as REST request service
  * @param shootMapService - request service for map queries
  */
  constructor(
    public messageService: MessageService,
    private shootMapService: ShootMapService,
    private notificationService: NotificationService,
    public translate: TranslateService
    ) {
      this.hitMessage = 'TOAST.HIT';
      this.missMessage = 'TOAST.MISS';
      this.turnMessage = 'TOAST.YOUR_TURN';
      this.enemyTurnMessage = 'TOAST.ENEMY_TURN';
     }
  
  /**
  * Calls for getShipMapGrid() method on component initialization
  */
  ngOnInit(): void {
    this.getShotMap();
  }

  /**
  * Updates local array representation of squares
  */
  getShotMap(): void {
    this.shootMapService.getShootMap()
    .subscribe(squares => this.map = squares);
  }

  // TODO
  /**
   * Changes square status depanding on ship/no ship found - implemantation to be updated (map can only hold statuses hit or miss);
   * Logic to be moved to backend.
   * @param id - square identification number
   */
  changeStatus(id: number): void {
    console.log("Changing cell status");
    const currentButton = this.map[id - 1];
    console.log("Before: ", currentButton.status);
    if(currentButton.taken) {
      currentButton.status = 1;
      this.showMessage(this.turnMessage, NotificationType.info);
      this.showMessage(this.hitMessage, NotificationType.success);
    } else {
      currentButton.status = 2;
      this.showMessage(this.enemyTurnMessage, NotificationType.info);
      this.showMessage(this.missMessage, NotificationType.error);
    }
    this.updateButtonStatus(currentButton);
    this.getShotMap();
    console.log("After: ", this.map[id-1].status);
  }

  /**
   * Updates status of a single square on the map om the server when shot
   * @param square - square on the map that has been shot
   */
  updateButtonStatus(square: Square) {
    this.shootMapService.updateSquare(square)
    .subscribe();
  }

  /**
   * Calls toast service to send notification
   */
  showMessage(message: string, type: NotificationType) {
    this.translate
        .get(message)
        .subscribe((msg: string) => {this.notificationService.print(msg, type)});
  }

}