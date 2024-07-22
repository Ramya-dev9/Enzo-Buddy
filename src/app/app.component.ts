import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './enzo-buddy-bot/chat.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  theme?: string;
  // links = [
  //   {path:'/home',label:'home',active:'button-active'},
  //   {path:'/chat',label:'chat',active:'button-active'}
  // ]
  constructor( private _router: Router,private renderer: Renderer2,private chatService: ChatService){
    this._router.navigateByUrl('/');
    this.theme = 'dark';
    this.chatService.theme = 'dark';
  }

  changeTheme(theme:string) {
    this.theme = theme;
    const parent = document.getElementById('textarea');
    if(theme === 'dark') {
    document.body.style.cssText = 'background-color: black';
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
}
