import { Component, OnInit, Renderer2 } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit  {

  messages: Message[] = [];
  value!: string;
  userName?: string;
  greeting?: string;

  constructor(public chatService: ChatService,private route: ActivatedRoute,private renderer: Renderer2) { 
    this.userName = this.chatService.userName.trim();
    this.getGreeting(new Date().getHours());
  }

  ngOnInit() {
    //this.chatService.changeTheme(this.chatService.theme)
      this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
   const theme =  this.chatService.theme; 
   const parent = document.getElementById('textarea');
   if(theme === 'dark') {
   this.renderer.setStyle(parent, 'background-color', 'black');
   this.renderer.setStyle(parent, 'color', 'white');
   this.chatService.theme = 'dark';
   }
  else if(theme === 'light') {
     document.body.style.cssText = 'background-color: white';
     this.renderer.setStyle(parent, 'background-color', 'white');
     this.renderer.setStyle(parent, 'color', 'black');
     this.chatService.theme = 'light';
     }
  }

  sendMessage() {
    this.chatService.getBotAnswer(this.value.trim());
    this.value = '';
  }

  getGreeting(date: any) {
   console.log(date)
   if(date >= 4 && date <= 11) {
    this.greeting = 'Good Morning';
   }
   else if(date >=12 && date <= 23) {
    this.greeting = 'Good Evening';
   }
   else {
    this.greeting = 'Good Morning'
   }
  }

}