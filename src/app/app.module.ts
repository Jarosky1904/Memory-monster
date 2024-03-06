import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component'; 
import { HeaderComponent } from './header/header.component';
import { TimerService } from './timer.component';
import { CardComponent } from './card/card.component';
import { ScoreService } from './score.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HeaderComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [TimerService, ScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
