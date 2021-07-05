import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Statistics } from '../models/statistics';
import { Playerstats } from '../models/playerstats';
import { Playerslist } from '../models/playerslist';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private backendUrl = 'http://localhost:3002/data';

  constructor(private http: HttpClient) { }

  // haetaan päivittäiset pelaajat
  getDailyPlayers(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/dailyplayers`);
  }

  getWeeklyPlayers(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/weeklyplayers`);
  }

  getThirtyDaysPlayers(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/monthlyplayers`);
  }

  getPlayersToday(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/playerstoday`);
  }

  getAverageGametime(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/averagegametime`);
  }

  getAllShotBullets(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/allshotbullets`);
  }

  getAllStatistics(): Observable<any> {
    return this.http.get<Statistics>(`${this.backendUrl}/overallstats`);
  }

  getTotalOfPlayers(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/totalplayers`);
  }

  getPlayerStats(): Observable<any> {
    return this.http.get<Playerstats[]>(`${this.backendUrl}/usersessions`);
  }

  getPlayerStatsDev(gameid: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/playersessionsdev/${gameid}`);
  }

  getGameIds(): Observable<any> {
    return this.http.get<Playerslist[]>(`${this.backendUrl}/listgameids`);
  }

}
