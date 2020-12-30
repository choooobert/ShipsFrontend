import { Component, OnInit } from '@angular/core';

/**
 * Represents landing page to be shown when no more players can be added to the game
 */
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
