import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Playerstats } from '../../models/playerstats';

@Component({
  selector: 'app-gamestatslist',
  templateUrl: './gamestatslist.component.html',
  styleUrls: ['./gamestatslist.component.css']
})
export class GamestatslistComponent implements OnInit {

  statistics: Playerstats[];
  alertMessage: string;
  alertStyle: string;
  sessionTime: number;

  constructor(private data: DataService) { }

  // haetaan pelaajan statistiikat
  getPlayerStats() {
    return this.data.getPlayerStats().subscribe(res => {
      if (res.success === false) {
        this.alert('wrong', res.message);
      } else {
        this.statistics = res;
      }
    });
  }

  showStats(stat) {
    stat.showStats = !stat.showStats;
    this.sessionTime = stat.gamefinishtime;
  }

  // alertit
  alert(type, message) {
    if (type === 'wrong') {
      this.alertStyle = 'alert alert-danger';
      this.alertMessage = message;
    }
  }

  // muunnetaan aika sekunteista tunneiksi, minuuteiksi ja sekunteiksi
  time(seconds) {
    return(
    Math.floor(((seconds / 86400) % 1) * 24) + ':' +
    Math.floor(((seconds / 3600) % 1) * 60) + ':' +
    Math.round(((seconds / 60) % 1) * 60));
  }

  ngOnInit(): void {
    this.getPlayerStats();
  }

}
