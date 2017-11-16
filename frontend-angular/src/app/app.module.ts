import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview/overview.component';
import { MainComponent } from './vote/main/main.component';
import { routing }  from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClient,
    routing,
    FlexLayoutModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
