import { Component, OnInit } from '@angular/core';
import { Button } from '../button';
import { MapService } from '../map.service';

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

}