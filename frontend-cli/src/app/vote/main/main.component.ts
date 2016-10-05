import { Component, OnInit } from '@angular/core';
import {DbService} from '../../db.service';
import {BaselineBar, Bar} from '../../baselineBar';

@Component({
  selector: 'voteview',
  providers: [DbService],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  errorMessage: string;

  constructor(private dbService: DbService) { }

  baselineBar: BaselineBar;
  bars: Bar[];
  originalRevenue: number;

  ngOnInit() {
    this.getBaselineBars();
  }

  getBaselineBars() {
    this.dbService.getVoteview(1).
                  subscribe(
                    baselineBar => {
                      this.baselineBar = baselineBar;
                      this.bars = baselineBar.bars;
                      this.originalRevenue =
                        baselineBar.bars.reduce((a,b) => {
                                                return a + (b.basevalue);
                             }, 0);
                           },
                    error => this.errorMessage = <any>error
                  );
  }

}
