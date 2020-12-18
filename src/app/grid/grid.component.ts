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

  changeStatus(id: number): number {
    console.log("Changing cell status");
    console.log("Before: ", this.buttons[id+1].status);
    if(this.buttons[id-1].taken) {
      this.buttons[id-1].status = 1;
    } else {
      this.buttons[id-1].status = 2;
    }
    console.log("After: ", this.buttons[id-1].status);
    return id; 
  }

}