import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { GameComponent } from './game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ShootMapComponent } from './shoot-map/shoot-map.component';
import { ShipMapComponent } from './ship-map/ship-map.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  /**
   * Declaration list of components used within the application
   */
  declarations: [
    AppComponent,
    HomeComponent,
    WaitingRoomComponent,
    GameComponent,
    LandingComponent,
    ShootMapComponent,
    ShipMapComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    // Routing between components allows to address them directly
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    // Material package modules used for map display
    MatGridListModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
