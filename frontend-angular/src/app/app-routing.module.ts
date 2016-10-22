import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { OverviewComponent } from './overview/overview/overview.component';
import { MainComponent } from './vote/main/main.component';

const routes: Routes = [
  {   path: 'home',            component: OverviewComponent  },
  {   path: 'voteview/:id',    component: MainComponent  },
  {   path: '',                component: OverviewComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

export const appRoutingProviders: any[] = [
];
