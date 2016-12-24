import { Component, OnInit } from '@angular/core';
import {Baseline} from '../../model/baseline';
import {BackendService} from '../../service/backend.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'overview',
  providers: [BackendService],
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  errorMessage: string;

  constructor(private dbService: BackendService,private router: Router) { }

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
