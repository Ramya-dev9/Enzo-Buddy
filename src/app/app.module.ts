import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularBotModule } from './enzo-buddy-bot/bot-module';
import { AppRoutingModule } from './app-router.module';
import {APP_BASE_HREF} from '@angular/common';
import { HomeComponent } from './enzo-buddy-bot/home/home.component';
import { ChatComponent } from './enzo-buddy-bot/chat/chat.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:[ 
    BrowserModule, 
    FormsModule, 
    AppRoutingModule, 
    AngularBotModule,
    HttpClientModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]


})
export class AppModule { }
