import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import './rxjs-operators';
import { Http, Response } from '@angular/http';
import {Baseline} from './baseline';
import {BaselineBar} from './baselineBar';
import {Bar} from './baselineBar';

@Injectable()
export class DbService {
  private overviewUrl = 'api/overview';
  private voteviewUrl = 'api/voteview';

  constructor (private http: Http) {}

  getOverview(): Observable<Baseline[]> {
    return this.http.get(this.overviewUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getVoteview(baselineId: number): Observable<BaselineBar> {
    return this.http.get(this.voteviewUrl + '/' + baselineId)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let data = res.json().data;
    return data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
