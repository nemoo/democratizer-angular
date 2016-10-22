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
      .subscribe(bars => {
          this.bars = bars;
          this.modifiedRevenue = bars.map(b => b.delta)
            .reduce((a,b) => a + b, 0);
      });
  }

  baselineBar: BaselineBar;
  bars: Observable<Bar[]>;
  originalRevenue: number;
  modifiedRevenue: number;

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
                      this._store.dispatch({type: "INIT", payload: baselineBar.bars})
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

  increaseBar(bar: Bar){     
    this._store.dispatch({type: "INCREASE_BAR", payload: bar.basevalueId});
  }

  decreaseBar(bar: Bar){     

    this._store.dispatch({type: "DECREASE_BAR", payload: bar.basevalueId});
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
