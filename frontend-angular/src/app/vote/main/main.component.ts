import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../service/backend.service';
import {BaselineBar, Bar} from '../../model/baselineBar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'voteview',
  providers: [BackendService],
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  errorMessage: string;

  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) { }

  baselineBar: BaselineBar;
  bars: Bar[];
  originalRevenue: number;
  modifiedRevenue: number;

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) =>   this.getBaselineBars(id) );
  }

  getBaselineBars(id: number) {
    this.backendService.getVoteview(id)
                  .subscribe(
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

  myProposalPercentage(bar: Bar): number {
    return bar.delta  / 1000;
  }

  increaseBar(bar: Bar){     this.changeAmount( bar, 5000)  }
  decreaseBar(bar: Bar){     this.changeAmount( bar,-5000)  }

  changeAmount( bar: Bar, amount: number) {
      this.bars = this.bars.map( b => {
        if (b === bar) {
          return Object.assign({},b,{delta: bar.delta + amount})
        }
        return b;
      });
  }

  save(){
    const data = Object.assign({},this.baselineBar, {bars: this.bars});
    this.backendService.saveBaseline(data)
                  .subscribe(
                    baselineBar => this.snackBar.open("Saved!", "OK", {duration: 2000}),
                    error => this.errorMessage = <any>error
                  );
  }


}
