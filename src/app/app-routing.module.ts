import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { GameComponent } from './game/game.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent},
  { path: 'home', component: HomeComponent },
  { path: 'waiting-room', component: WaitingRoomComponent },
  { path: 'game/:name', component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }