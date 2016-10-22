import { Component, OnInit } from '@angular/core';
import {Baseline} from '../../baseline';
import {DbService} from '../../db.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'overview',
  providers: [DbService],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  errorMessage: string;

  constructor(private dbService: DbService,private router: Router) { }

  ngOnInit() {
    this.getBaselines();
  }

  baselines: Baseline[];

  getBaselines() {
    this.dbService.getOverview().
                  subscribe(
                    baselines => this.baselines = baselines,
                    error => this.errorMessage = <any>error
                  );
  }

  selectBaseline(baseline: Baseline) {
    this.router.navigate(['/voteview', baseline.baselineId]);
  }

}
