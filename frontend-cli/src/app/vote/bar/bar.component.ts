import { Component, OnInit, Input} from '@angular/core';
import { Bar} from '../../baselineBar';


@Component({
  selector: 'vote-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor() { }

  percentageBase: number = 5;
  percentageDelta: number = 5;
  absoluteDelta: number = 0;
  stepping: number = 5000;

  increaseBar() {
      this.absoluteDelta = this.absoluteDelta + this.stepping; 
      this.updateBar();       
  }  

  decreaseBar() {
      this.absoluteDelta = this.absoluteDelta - this.stepping;  
      this.updateBar();      
  }    

  updateBar(){
    this.percentageDelta = this.absoluteDelta / 1000;
  }

  ngOnInit() {
    const absoluteBase = this.bar.basevalue;
    this.percentageBase = absoluteBase / 1000;
    this.absoluteDelta = this.bar.basevalue + (this.bar.delta || 0);
    this.updateBar();   
  }

  @Input()
  bar:  Bar;

}
