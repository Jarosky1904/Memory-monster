import { Component } from '@angular/core';
import { TimerService } from '../timer.component';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  showPlayButton: boolean = true;
  showDifficultyButtons: boolean = false;
  showCards: boolean = false;
  showGameOverMessage: boolean = false;

  constructor(private timerService: TimerService, private scoreService: ScoreService) {
    this.timerService.timerUpdate$.subscribe(time => {
      if (time === 0) {
        this.resetGame();
      }
    });
  }

  startGame(dificultad: string) {
    this.showPlayButton = false;
    this.showDifficultyButtons = false;
    this.showCards = true;
    this.scoreService.resetScore(0);

    let duration = 0;
    switch (dificultad) {
      case 'facil':
        duration = 180;
        break;
      case 'medio':
        duration = 120;
        break;
      case 'dificil':
        duration = 60;
        break;
    }
    this.timerService.startTimer(duration);

    this.timerService.timerUpdate$.subscribe(time => {
    });
  }

  resetGame() {
      this.showGameOverMessage = true;
      setTimeout(() => {
        this.showGameOverMessage = false;
        this.showPlayButton = true;
        this.showDifficultyButtons = false;
        this.showCards = false;
      }, 3000)
  }
}
