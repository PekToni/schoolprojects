import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { AbouteditComponent } from './components/aboutedit/aboutedit.component';
import { AddgameComponent } from './components/addgame/addgame.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContacteditComponent } from './components/contactedit/contactedit.component';
import { GamestatsComponent } from './components/gamestats/gamestats.component';
import { GamestatslistComponent } from './components/gamestatslist/gamestatslist.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/message/message.component';
import { NewsComponent } from './components/news/news.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { TeamComponent } from './components/team/team.component';
import { TeameditComponent } from './components/teamedit/teamedit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NewsaddComponent } from './components/newsadd/newsadd.component';
import { UserseditComponent } from './components/usersedit/usersedit.component';
import { Role } from './models/role';
import { AuthGuard } from './guards/auth.guard';
import { Messageresolver } from './helpers/messageresolver';



const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'aboutedit', component: AbouteditComponent, canActivate: [AuthGuard], data: {roles: [Role.Developer, Role.Admin]}},
  { path: 'addgame', component: AddgameComponent, canActivate: [AuthGuard], data: {roles: [Role.Developer, Role.Admin, Role.User]} },
  { path: 'contact', component: ContactComponent },
  { path: 'contactedit', component: ContacteditComponent, canActivate: [AuthGuard], data: {roles: [Role.Developer, Role.Admin]}},
  { path: 'gamestats', component: GamestatsComponent, canActivate: [AuthGuard], data: {roles: [Role.Developer]}},
  { path: 'gamestatslist', component: GamestatslistComponent, 
    canActivate: [AuthGuard], data: {roles: [Role.User, Role.Admin, Role.Developer]}},
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard], data: {roles: [Role.Developer, Role.Admin]}},
  { path: 'message/:id', component: MessageComponent, resolve: { message: Messageresolver },
    canActivate: [AuthGuard], data: {roles: [Role.Developer, Role.Admin]}},
  { path: 'news', component: NewsComponent },
  { path: 'newsadd', component: NewsaddComponent, canActivate: [AuthGuard], data: {roles: [Role.Developer, Role.Admin]}},
  { path: 'statistics', component: StatisticsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'teamedit', component: TeameditComponent, canActivate: [AuthGuard], data: {roles: [Role.Developer, Role.Admin]}},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'usersedit', component: UserseditComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

