import { Component, OnInit } from '@angular/core';
import { FIELDS } from '../mock-map';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  buttons = FIELDS;

  constructor() { }

  ngOnInit(): void {
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

  enableDisableRule(): void{
    console.log("Enable/disable inside grid component");
  }

  getStatus(id: number): number{
    console.log("Getting cell status");
    return id; 
  }

}