import { Component, OnInit } from '@angular/core';
import { Button } from '../button';
import { MapService } from '../map.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  buttons: Button[];

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.getGrid();
  }

  getGrid(): void {
    this.mapService.getGrid()
    .subscribe(buttons => this.buttons = buttons);;
  }

  onClick(id: number): boolean {
    if (id % 2 == 0) {
      console.log("Hit: ", true);
      return true;
    } else {
      console.log("Hit: ", false);
      return false;
    }
  }

  getStatus(id: number): number{
    console.log("Getting cell status");
    return id; 
  }

}