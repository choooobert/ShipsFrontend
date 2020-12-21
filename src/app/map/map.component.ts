import { Component, OnInit } from '@angular/core';
import { Square } from '../square';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  buttons: Square[];

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.getGrid();
  }

  getGrid(): void {
    this.mapService.getGrid()
    .subscribe(buttons => this.buttons = buttons);;
  }

}