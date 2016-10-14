import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview/overview.component';
import { MainComponent } from './vote/main/main.component';
import { routing }  from './app-routing.module';
import { BarComponent } from './vote/bar/bar.component';


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    MainComponent,
    BarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
