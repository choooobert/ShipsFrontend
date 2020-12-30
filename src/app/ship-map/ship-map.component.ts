import { Component, OnInit } from '@angular/core';
import { Square } from '../square';
import { ShipMapService } from '../ship-map.service';


/**
 * Represents players map with his/her ships.
 */
@Component({
  selector: 'app-ship-map',
  templateUrl: './ship-map.component.html',
  styleUrls: ['./ship-map.component.css']
})
export class ShipMapComponent implements OnInit {
  
  map: Square[];

  /**
   * Using injection of map service to be used as REST request service
   * @param shipMapService - request service for map queries
   */
  constructor(private shipMapService: ShipMapService) { }

  /**
   * Calls for getShipMapGrid() method on component initialization
   */
  ngOnInit(): void {
    this.getShipMapGrid();
  }

  /**
   * Updates local array representation of squares
   */
  getShipMapGrid(): void {
    this.shipMapService.getShipMapGrid()
    .subscribe(map => this.map = map);;
  }

}