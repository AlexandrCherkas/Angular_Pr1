import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarShellComponent } from './components/car-shell/car-shell.component';
import { SetbarComponent } from '../shared/components/setbar/setbar.component';
// import { MatIconModule } from '@angular/material/icon';
import { CarsRoutingModule } from './cars-routing.module';

@NgModule({
  declarations: [
    CarListComponent,
    CarShellComponent,
    SetbarComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    BrowserModule
  ]
})
export class CarsModule { }
