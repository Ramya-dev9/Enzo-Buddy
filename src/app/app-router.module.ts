import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './enzo-buddy-bot/chat/chat.component';
import { HomeComponent } from './enzo-buddy-bot/home/home.component';
const routes:Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  {path:'home', component: HomeComponent},
  {path:'chat', component: ChatComponent},
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule {};