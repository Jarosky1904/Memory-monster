import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private _score = new BehaviorSubject<number>(0);
  score$ = this._score.asObservable();

  constructor() {}

  updateScore(newScore: number) {
    this._score.next(this._score.value + newScore);
  }

  resetScore(newScore: number) {
    this._score.next(newScore);
  }
}
