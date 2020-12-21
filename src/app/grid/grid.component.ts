import { Component, OnInit } from '@angular/core';
import { MessageService } from '../messages.service';
import { ShootMapService } from '../shoot-map.service';
import { Square } from '../square';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  
  buttons: Square[];

  constructor(
    public messageService: MessageService,
    private shootMapService: ShootMapService,
    ) { }

  ngOnInit(): void {
    this.getGrid();
  }

  getGrid(): void {
    this.shootMapService.getGrid()
    .subscribe(buttons => this.buttons = buttons);
  }

  changeStatus(id: number): void {
    console.log("Changing cell status");
    const currentButton = this.buttons[id - 1];
    console.log("Before: ", currentButton.status);
    if(currentButton.taken) {
      currentButton.status = 1;
      this.messageService.add(`Hit !`);
    } else {
      currentButton.status = 2;
      this.messageService.add(`Miss !`);
    }
    this.updateButtonStatus(currentButton);
    this.getGrid();
    console.log("After: ", this.buttons[id-1].status);
  }

  updateButtonStatus(button: Square) {
    this.shootMapService.updateButton(button)
    .subscribe();
  }

}