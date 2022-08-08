import { RaceWinner } from '../../../types';
import './garage-winner-modal.scss';

export class GarageWinnerModal {
  element: HTMLElement;

  title: HTMLElement;

  constructor(winnerData: RaceWinner) {
    this.element = document.createElement('div');
    this.element.classList.add('winner-modal');

    this.title = document.createElement('h1');
    this.title.classList.add('winner-modal-title');
    this.title.style.color = `${winnerData.color}`;
    this.title.innerHTML = `The Winner is <span>${winnerData.name}</span> with <span>${winnerData.time}</span> seconds...`;

    this.element.appendChild(this.title);
  }
}
