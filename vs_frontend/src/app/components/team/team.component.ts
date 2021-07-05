import { Component, OnInit } from '@angular/core';
import { WebdataService } from '../../services/webdata.service';
import { Team } from '../../models/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: Team[];
  image: string;
  about: string;

  constructor(private web: WebdataService) { }

  getTeam() {
    return this.web.getTeam().subscribe(res => {
      this.team = res;
      this.image = this.team[0].image;
      this.about = this.team[0].about;
    });
  }

  ngOnInit() {
    this.getTeam();
  }

}
