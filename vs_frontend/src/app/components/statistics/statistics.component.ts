import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Statistics } from '../../models/statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  playerCount: ChartDataSets[] = [{data: [], label: 'Only played days'}];
  playerCountSevenDays: ChartDataSets[] = [{data: [], label: 'Last 7 days'}];
  playerCountThirtyDays: ChartDataSets[] = [{data: [], label: 'Last 30 days'}];
  gunshotAccuracyPie: any = [{data: []}];
  meleeAccuracyPie: any = [{data: []}];
  playDate: Label[] = [];
  playDateSeven: Label[] = [];
  playDateThirty: Label[] = [];
  gunshotAccuracy: Label[] = ['Bullets hit', 'Bullets missed'];
  meleeAccuracy: Label[] = ['Melee hits', 'Melee hits missed'];
  options = {
    responsive: true,
  };
  colors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(84,252,32,0.28)',
    },
  ];

  piechartColors: Color[] = [
    {
      backgroundColor: ['rgba(0,255,0,0.28)', 'rgba(255,0,0,0.28']
    }
  ];

  legend = true;
  plugins = [];
  playerstype = 'line';
  pietype = 'pie';

  allTime = true;
  seven = false;
  thirty = false;

  playersToday: number;
  averageGamingtime: number;
  allBullets: number;
  totalUniquePlayers: number;

  statistics: Statistics[];

  constructor(private data: DataService) { }

  // haetaan pelaajat jokaiselta päivältä kun peliä on pelattu
  getDailyPlayers() {
    return this.data.getDailyPlayers().subscribe(res => {
      for (const r of res) {
        this.playerCount[0].data.push(r.playeramount);
        this.playDate.push(r.playdatetime.slice(0, 10));
      }
    });
  }

  // haetaan pelaajamäärä nykyiselle päivämäärälle
  getPlayersToday() {
    return this.data.getPlayersToday().subscribe(res => {
      this.playersToday = res.playeramount;
    });
  }

  // haetaan pelaajamäärä viimeisen 30 päivän ajalta
  lastThirtyDays() {
    return this.data.getThirtyDaysPlayers().subscribe(res => {
      for (const r of res) {
        this.playerCountThirtyDays[0].data.push(r.playeramount);
        this.playDateThirty.push(r.playdatetime.slice(0, 10));
      }
    });
  }

  // haetaan pelaajamäärä viimeisen 7 päivän ajalta
  lastSevenDays() {
    return this.data.getWeeklyPlayers().subscribe(res => {
      for (const r of res) {
        this.playerCountSevenDays[0].data.push(r.playeramount);
        this.playDateSeven.push(r.playdatetime.slice(0, 10));
      }
    });
  }

  // keskimääräinen peliaika pelaajilla
  averageGametime() {
    return this.data.getAverageGametime().subscribe(res => {
      this.averageGamingtime = res[0].averagegametime;
    });
  }

  // haetaan kaikki statistiikat
  getAllStatistics() {
    return this.data.getAllStatistics().subscribe(res => {
      this.statistics = res;

      // laskut
      this.gunShotAccuracy();
      this.meleeHitAccuracy();
    });
  }

  // pelaajien osumaprosentti ampuma-aseella
  gunShotAccuracy() {
    const accuracy = ((this.statistics[0].bullethits / this.statistics[0].shotbullets) * 100);
    const bulletswasted = (100 - accuracy);
    this.gunshotAccuracyPie[0].data.push(Math.round(accuracy), Math.round(bulletswasted));
  }

  // pelaajien osumaprosentti melee-aseella
  meleeHitAccuracy() {
    const accuracy = ((this.statistics[0].meleehitsonenemy / this.statistics[0].meleehits) * 100);
    const meleemissed = (100 - accuracy);
    this.meleeAccuracyPie[0].data.push(Math.round(accuracy), Math.round(meleemissed));
  }

  // keskimääräinen pelisessioiden määrä pelaajaa kohden
  averageGameSessionsByPlayer() {
    const average = (this.statistics[0].sessions / this.totalUniquePlayers).toFixed(2);
    return average;
  }

  // uniikkien pelaajien määrä
  totalPlayers() {
    return this.data.getTotalOfPlayers().subscribe(res => {
      this.totalUniquePlayers = res[0].uniqueplayers;
    });
  }

  // kaiken pelatun graafin näyttö
  showAllTime() {
    this.allTime = !this.allTime;
    this.seven = false;
    this.thirty = false;
  }

  // seitsemän päivän graafin näyttö
  showSeven() {
    this.seven = !this.seven;
    this.allTime = false;
    this.thirty = false;
  }

  // 30 päivän graafin näyttö
  showThirty() {
    this.thirty = !this.thirty;
    this.allTime = false;
    this.seven = false;
  }

  // muunnetaan aika sekunteista tunneiksi, minuuteiksi ja sekunteiksi
  time(seconds) {
      return(
      Math.floor(((seconds / 86400) % 1) * 24) + ':' +
      Math.floor(((seconds / 3600) % 1) * 60) + ':' +
      Math.round(((seconds / 60) % 1) * 60));
  }

  ngOnInit(): void {
      this.getDailyPlayers();
      this.lastSevenDays();
      this.lastThirtyDays();
      this.getPlayersToday();
      this.averageGametime();
      this.getAllStatistics();
      this.totalPlayers();
    }

}
