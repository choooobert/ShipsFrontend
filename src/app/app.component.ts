import { Component } from '@angular/core';

/**
 * Main view of the app;
 * Encapsulates other components;
 * Contains developer menu - to be removed for final release @see app.component.html
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Ships: The Game';
}
