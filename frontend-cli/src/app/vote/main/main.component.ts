import { Component, OnInit } from '@angular/core';
import {DbService} from '../../db.service';
import {BaselineBar, Bar} from '../../baselineBar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'voteview',
  providers: [DbService],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  errorMessage: string;

  constructor(private dbService: DbService, private route: ActivatedRoute) { }

  baselineBar: BaselineBar;
  bars: Bar[];
  originalRevenue: number;

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) =>   this.getBaselineBars(id) );
  }

  getBaselineBars(id: number) {
    this.dbService.getVoteview(id)
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

  percentage(amount: number): number {
    return amount / 1000;
  }

  increaseBar( bar: Bar) {
      console.log("i increase" + bar.category + " by " + 5000);
//      const otherBars = this.bars.filter(b => b.basevalueId != bar.basevalueId);
//      const updatedBar = Object.assign({}, bar, {delta: bar.delta + 5000});
//      this.bars = [...otherBars, updatedBar];    

      this.bars = this.bars.map( b => {
        if (b === bar) {
          return Object.assign({},b,{delta: bar.delta + 5000})
        }
        return b;
      });   
  }

  save(){
    this.dbService.saveBaseline(this.baselineBar)    
                  .subscribe(
                    baselineBar => console.log("saved"),
                    error => this.errorMessage = <any>error
                  );    
  }


}
