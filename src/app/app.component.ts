import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationType } from './notification.message';
import { NotificationService } from './notification.service';

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
export class AppComponent implements OnInit{
  title = 'Ships: The Game';

  constructor(
    private toastr: ToastrService,
    private notificationService: NotificationService
    ){}

  /**
   * Test purpose only - REMOVE
   */
  ngOnInit(): void {
  }
  
}
