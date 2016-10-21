import { Component, OnInit } from '@angular/core';
import {DbService} from '../../db.service';
import {BaselineBar, Bar} from '../../baselineBar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'voteview',
  providers: [DbService],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  errorMessage: string;

  constructor(
    private dbService: DbService, 
    private route: ActivatedRoute,
    private _store: Store<any>
  ) { 
    _store.distinctUntilChanged()
      .subscribe(bar => {
          this.bar = bar;
      });
  }

  baselineBar: BaselineBar;
  bars: Bar[];
  originalRevenue: number;
  bar: Observable<Bar>;

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

  myProposal(bar: Bar) { return bar.basevalue + bar.delta }
  
  myProposalPercentage(bar: Bar): number {
    return this.myProposal(bar) / 1000;
  }

  increaseBar(bar: Bar){     
    this.changeAmount( bar, 5000)  
    this._store.dispatch({type: "INCREASE_BAR"})
  }

  decreaseBar(bar: Bar){     
    this.changeAmount( bar,-5000)
    this._store.dispatch({type: "DECREASE_BAR"})  
  }

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
    this.dbService.saveBaseline(data)    
                  .subscribe(
                    baselineBar => console.log("saved"),
                    error => this.errorMessage = <any>error
                  );    
  }


}
