import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private chatService: ChatService, private _router: Router) {
   }

  ngOnInit() {
  }

  sendName(event: any) {
    // console.log(event.target.value)
   this.chatService.userName = event.target.value;
   this._router.navigateByUrl('/chat');
  }

}