import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../messages.service';

/**
 * Represents messages block placed within game view
 */
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  /**
   * Injecting message service to the component
   * @param messageService - service used for communication with the server
   */
  constructor(
    public messageService: MessageService,
    public translate: TranslateService) {
      translate.setDefaultLang('en');
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
   }
}
