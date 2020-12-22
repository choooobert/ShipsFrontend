import { Component, OnInit } from '@angular/core';
import { MessageService } from '../messages.service';
import { ShootMapService } from '../shoot-map.service';
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

  /**
  * Using injection of map service to be used as REST request service
  * @param shootMapService - request service for map queries
  */
  constructor(
    public messageService: MessageService,
    private shootMapService: ShootMapService,
    ) { }
  
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
      this.messageService.add(`Hit !`);
    } else {
      currentButton.status = 2;
      this.messageService.add(`Miss !`);
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
    this.shootMapService.updateButton(square)
    .subscribe();
  }

}