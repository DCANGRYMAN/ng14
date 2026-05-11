import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ChartComponent } from './components/chart/chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatsComponent } from './components/stats/stats.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideBarComponent,
    ChartComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
