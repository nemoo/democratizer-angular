import { Component, OnInit } from '@angular/core';
import {Baseline} from '../../baseline';
import {DbService} from '../../db.service';

@Component({
  selector: 'overview',
  providers: [DbService],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  errorMessage: string;

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.getBaselines();
  }

  //baselines = [{name: "a"},{name: "b"}];
  baselines: Baseline[];

  getBaselines() {
    this.dbService.getOverview().
                  subscribe(
                    baselines => this.baselines = baselines,
                    error => this.errorMessage = <any>error
                  );
  }

}
