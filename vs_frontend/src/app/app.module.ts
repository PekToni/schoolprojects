import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { NewsComponent } from './components/news/news.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamComponent } from './components/team/team.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { NewsaddComponent } from './components/newsadd/newsadd.component';
import { AbouteditComponent } from './components/aboutedit/aboutedit.component';
import { TeameditComponent } from './components/teamedit/teamedit.component';
import { ContacteditComponent } from './components/contactedit/contactedit.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/message/message.component';
import { Messageresolver } from './helpers/messageresolver';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AddgameComponent } from './components/addgame/addgame.component';
import { GamestatsComponent } from './components/gamestats/gamestats.component';
import { GamestatslistComponent } from './components/gamestatslist/gamestatslist.component';
import { UserseditComponent } from './components/usersedit/usersedit.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    NavComponent,
    NewsComponent,
    RegisterComponent,
    TeamComponent,
    NewsaddComponent,
    AbouteditComponent,
    TeameditComponent,
    ContacteditComponent,
    MessagesComponent,
    MessageComponent,
    StatisticsComponent,
    AddgameComponent,
    GamestatsComponent,
    GamestatslistComponent,
    UserseditComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    YouTubePlayerModule,
    ReactiveFormsModule,
    ChartsModule,
    AppRoutingModule
  ],
  providers: [ Messageresolver,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
