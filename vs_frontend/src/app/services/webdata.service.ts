import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { News } from '../models/news';
import { About } from '../models/about';
import { Team } from '../models/team';
import { Contactinfo } from '../models/contactinfo';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class WebdataService {

  private backendUrl = 'http://localhost:3002/webusers';
  private newMessage = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // haetaan kaikki uutiset
  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.backendUrl}/news`);
  }

  // lisätään uutinen
  addNews(news: any): Observable<News[]> {
    return this.http.post<News[]>(`${this.backendUrl}/newsadd`, news);
  }

  // haetaan pelin tiedot
  getAbout(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/about`);
  }

  // logon vaihtaminen
  changeLogo(logo: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.backendUrl}/about/updatelogo`, logo);
  }

  // pelin infotekstin vaihtaminen
  changeAbout(about: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.backendUrl}/about/updateabout`, about);
  }

  // lisätään kuva galleriaan
  addImage(image: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.backendUrl}/about/addimage`, image);
  }

  // lisätään traileri
  addTrailer(trailer: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/about/addtrailer`, trailer);
  }

  // haetaan tiimitiedot
  getTeam(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.backendUrl}/team`);
  }

  // muokataan tiimikuva
  editTeamImage(image: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/team/editimage`, image);
  }

  // muokataan tiimitietoja
  editTeamAbout(about: Team[]): Observable<any> {
    return this.http.post<Team[]>(`${this.backendUrl}/team/editinfo`, about);
  }

  // haetaan tiimin yhteystiedot
  getTeamContactInfo(): Observable<Contactinfo[]> {
    return this.http.get<Contactinfo[]>(`${this.backendUrl}/contact`);
  }

  // muokataan tiimin yhteystiedot
  editTeamContactInfo(contactinfo: Contactinfo[]): Observable<any> {
    return this.http.post<Contactinfo[]>(`${this.backendUrl}/contact/edit`, contactinfo);
  }

  // lähetetään uusi viesti
  createContactMessage(message: Contact[]): Observable<any> {
    return this.http.post<Contact[]>(`${this.backendUrl}/contact`, message);
  }

  // haetaan kaikki viestit
  showAllMessages(): Observable<any> {
    return this.http.get<Contact[]>(`${this.backendUrl}/contactall`);
  }

  // haetaan viesti id:n perusteella
  showMessageById(messageId: string): Observable<any> {
    return this.http.get<Contact[]>(`${this.backendUrl}/contact/${messageId}`);
  }

  // kuitataan viesti lukutila
  setRead(read: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/contact/setread`, read);
  }

  // haetaan tila onko uusia viestejä
  newMessages() {
    return this.http.get<any>(`${this.backendUrl}/contactnew`);

  }

  // palautetaan boolean uusista viesteistä
  newMessageStatus() {
    this.newMessages().subscribe(res => {
      if (res.success === true) {
        this.newMessage.next(true);
      } else if (res.success === false) {
        this.newMessage.next(false);
      }
    });
  }

  // uusien viestien tilan välitys
  getNewMessageState(): Observable<boolean> {
    return this.newMessage.asObservable();
  }

  // uutisen päivittäminen
  updateNews(news: any): Observable<any> {
    return this.http.post<News[]>(`${this.backendUrl}/newsupdate`, news);
  }

  // kuvan poisto galleriasta
  removeImageFromGallery(id: string): Observable<any> {
    return this.http.delete(`${this.backendUrl}/about/removeimage/${id}`);
  }

  // trailerin poisto galleriasta
  removeTrailerFromGallery(id: string): Observable<any> {
    return this.http.delete(`${this.backendUrl}/about/removetrailer/${id}`);
  }

  // pelin lisääminen käyttäjälle
  addGameForUser(gameinfo: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/addgame`, gameinfo);
  }

  // webusereiden listaus
  listWebusers(): Observable<any> {
    return this.http.get(`${this.backendUrl}/listwebusers`);
  }

  // webusereiden roolien muokkaus
  editUserRole(userinfo: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/updaterole`, userinfo);
  }

}


