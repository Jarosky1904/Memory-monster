import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  countdownTimer: number = 0;
  timerUpdate$: Subject<number> = new Subject<number>();

  startTimer(duration: number) {
    this.countdownTimer = duration;

    const interval = setInterval(() => {
      if (this.countdownTimer > 0) {
        this.countdownTimer--;
        this.timerUpdate$.next(this.countdownTimer);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }
}
