import { Component, Output, EventEmitter } from '@angular/core';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  cardImages: string[] = ['Centipie.jpg', 'Demonio.jpg', 'Dragon.jpg', 'Ghost.jpg', 
                          'Korschey.jpg', 'Mr-Scratch.jpg', 'Vampire.jpg', 'Wyvern.jpg'];  
  pairs: string[][];
  flipped: boolean[] = [];
  matched: boolean[] = [];
  selectedCardIndex: number = -1;
  needToFlipAgain: boolean[] = [];

  @Output() scoreChanged = new EventEmitter<number>();

  constructor(private scoreService: ScoreService) {
    this.cardImages = this.cardImages.concat(this.cardImages);
    this.pairs = this.chunkArray(this.cardImages, 4); 

    this.flipped = Array(this.cardImages.length).fill(false);
    this.matched = Array(this.cardImages.length).fill(false);
  }

  ngOnInit() {
    this.generateRandomPairs();
  }

  generateRandomPairs() {
    const shuffledImages = this.cardImages.sort(() => Math.random() - 0.5);
    const selectedImages = shuffledImages.slice(0, 8);
    const pairsImages = selectedImages.concat(selectedImages);
    const shuffledPairs = pairsImages.sort(() => Math.random() - 0.5);
    this.pairs = this.chunkArray(shuffledPairs, 4);

    this.flipped = Array(this.pairs.length * this.pairs[0].length).fill(false);
    this.matched = Array(this.pairs.length * this.pairs[0].length).fill(false);
  }

  flipCard(index: number) {
    if (this.matched[index]) {
      return;
    }
  
    this.flipped[index] = true;
  
    if (this.selectedCardIndex === -1) {
      this.selectedCardIndex = index;
    } else {
      if (this.pairs[Math.floor(this.selectedCardIndex / 4)][this.selectedCardIndex % 4] === 
          this.pairs[Math.floor(index / 4)][index % 4]) {
        this.matched[this.selectedCardIndex] = true;
        this.matched[index] = true;
        this.scoreService.updateScore(1);
      } else {
        const firstIndex = this.selectedCardIndex;
        const secondIndex = index;
  
        setTimeout(() => {
          this.flipBack(firstIndex);
          this.flipBack(secondIndex);
        }, 1000);
  
        this.flipBackAnimation(firstIndex);
        this.flipBackAnimation(secondIndex);
      }
      this.selectedCardIndex = -1; 
    }
    if (this.allPairsMatched()) {
      this.generateRandomPairs();
      setTimeout(() => {
        this.resetCards();
      }, 1000);
    }
  }

  allPairsMatched(): boolean {
    return this.matched.every(match => match);
  }

  resetCards() {
    this.flipped = Array(this.cardImages.length).fill(false);
    this.matched = Array(this.cardImages.length).fill(false);
  }

  flipBackAnimation(index: number) {
    const cardElement = document.getElementById(`card-${index}`);
    if (cardElement) {
      cardElement.classList.add('flip-back');
      setTimeout(() => {
        cardElement.classList.remove('flip-back'); 
      }, 500); 
    }
  }
  
  flipBack(index: number) {
    this.flipped[index] = false;
  }
   
       
  chunkArray(array: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}
