import { Component, OnInit } from '@angular/core';
import { MessageService } from '../messages.service';
import { ShootMapService } from '../shoot-map.service';
import { Button } from '../button';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  
  buttons: Button[];

  constructor(public messageService: MessageService, private shootMapService: ShootMapService) { }

  ngOnInit(): void {
    this.getGrid();
  }

  getGrid(): void {
    this.shootMapService.getGrid()
    .subscribe(buttons => this.buttons = buttons);
  }

  changeStatus(id: number): number {
    console.log("Changing cell status");
    console.log("Before: ", this.buttons[id-1].status);
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