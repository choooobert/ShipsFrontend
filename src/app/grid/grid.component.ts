import { Component, OnInit } from '@angular/core';
import { BUTTONS } from '../mock-button';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  
  buttons = BUTTONS;

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