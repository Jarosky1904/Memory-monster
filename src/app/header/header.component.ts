// header.component.ts

import { Component, OnDestroy } from '@angular/core';
import { TimerService } from '../timer.component';
import { Subscription } from 'rxjs';
import { ScoreService } from '../score.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  countdownTimer: string = '00:00';
  score: number = 0;
  timerSubscription: Subscription;

  constructor(public timerService: TimerService, private scoreService: ScoreService) {
    this.timerSubscription = this.timerService.timerUpdate$.subscribe(time => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      this.countdownTimer = `${this.pad(minutes)}:${this.pad(seconds)}`;
    });

    // Suscribirse al servicio para recibir actualizaciones del puntaje
    this.subscribeToScoreChanges();
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  pad(value: number): string {
    return value < 10 ? '0' + value : '' + value;
  }

  // Método para suscribirse al servicio de puntaje
  private subscribeToScoreChanges() {
    this.scoreService.score$.subscribe(score => {
      this.score = score;
    });
  }
}
