import { Component, OnInit } from '@angular/core';
import { timer, Observable, of } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-alert-button',
  templateUrl: './alert-button.component.html',
  styleUrls: ['./alert-button.component.css']
})
export class AlertButtonComponent implements OnInit {

  content: Observable<any>;
  // content = 'You have been warned!';
  hideContent = true;
  severity    = 423;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.content = this.messageService.getFirebaseContent();
    // this.content = this.messageService.getContent();
    // this.content.subscribe((c) => console.log(c));
  }

  toggle() {
    this.hideContent = !this.hideContent;
  }

  toggleAsync() {
    timer(500).subscribe(() => {
      this.toggle();
    });
  }

}
