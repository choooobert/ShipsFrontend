import { Component, OnInit } from '@angular/core';
import { IpServiceService } from '../ip-service.service';  

import { PlayerService } from '../player.service';
import { Player } from '../player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  player: Player;
  players: Player[];
  ipAddress:string;  
  error_message:string;

  constructor(private playerService: PlayerService, private ip:IpServiceService) { }

  ngOnInit() {
    this.getPlayers();
    this.getIP();  
    }

  getIP(){  
    this.ip.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
    });  
  } 

  getPlayers(): void {
    this.playerService.getPlayers()
    .subscribe(players => this.players = players);
  }

  add(name: string): void {
    name = name.trim();
    let ip = this.ipAddress;
    let id = this.players.length+1;
    if (!name) { return; }
    this.playerService.addPlayer({name, ip, id} as Player)
                      .subscribe(player => {this.players.push(player);});
  }

}
