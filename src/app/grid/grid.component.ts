import { Component, OnInit } from '@angular/core';
import { BUTTONS } from '../mock-button';
import { MessageService } from '../messages.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  
  buttons = BUTTONS;

  constructor(public messageService: MessageService,) { }

  ngOnInit(): void {
  }

  changeStatus(id: number): number {
    console.log("Changing cell status");
    console.log("Before: ", this.buttons[id+1].status);
    if(this.buttons[id-1].taken) {
      this.buttons[id-1].status = 1;
      this.messageService.add(`Hit !`);
    } else {
      this.buttons[id-1].status = 2;
      this.messageService.add(`Miss !`);
    }
    console.log("After: ", this.buttons[id-1].status);
    return id; 
  }

}