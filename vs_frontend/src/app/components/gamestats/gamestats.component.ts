import { Component, OnInit } from '@angular/core';
import { Playerstats } from '../../models/playerstats';
import { Playerslist } from '../../models/playerslist';
import { WebdataService } from '../../services/webdata.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-gamestats',
  templateUrl: './gamestats.component.html',
  styleUrls: ['./gamestats.component.css']
})
export class GamestatsComponent implements OnInit {

  statistics: Playerstats;
  players: Playerslist[] = [];
  showList = false;
  sessionTime: number;

  constructor(private web: WebdataService, private data: DataService) { }

  listWebusers() {
    this.data.getGameIds().subscribe(res => {
      this.players = res;
    });
  }

  getStatistics(player) {
    return this.data.getPlayerStatsDev(player.gameid).subscribe(res => {
      if (res.length > 0) {
        this.statistics = res;
      } else {
        return;
      }
      player.showList = !player.showList;
      player.showStats = !player.showStats;
      this.showList = !this.showList;
    });
  }

  showStats(player, stat) {
    stat.showStats = !stat.showStats;
    player.showStatTable = !player.showStatTable;
    this.sessionTime = stat.gamefinishtime;
  }

  showStatList(player) {
    player.showList = !player.showList;
    this.showList = !this.showList;
    player.showStats = !player.showStats;
    player.showStatTable = !player.showStatTable;
  }

  // muunnetaan aika sekunteista tunneiksi, minuuteiksi ja sekunteiksi
  time(seconds) {
    return(
    Math.floor(((seconds / 86400) % 1) * 24) + ':' +
    Math.floor(((seconds / 3600) % 1) * 60) + ':' +
    Math.round(((seconds / 60) % 1) * 60));
  }

  ngOnInit(): void {
    this.listWebusers();
  }

}
