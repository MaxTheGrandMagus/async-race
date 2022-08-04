import { Button } from '../button/button';
import './header.scss';

export class Header {
  element: HTMLElement;

  private readonly garageButton: Button;
  private readonly winnersButton: Button;

  constructor() {
    this.element = document.createElement('header');
    this.element.classList.add('header');

    this.garageButton = new Button('to garage');
    this.winnersButton = new Button('to winners');
    this.element.appendChild(this.garageButton.element);
    this.element.appendChild(this.winnersButton.element);
    this.garageButton.element.addEventListener('click', () => {
      const garageView = document.querySelector('.garage-view') as HTMLElement;
      const winnersView = document.querySelector('.winners-view') as HTMLElement;
      garageView.style.display = 'block';
      winnersView.style.display = 'none';
    });
    this.winnersButton.element.addEventListener('click', () => {
      const garageView = document.querySelector('.garage-view') as HTMLElement;
      const winnersView = document.querySelector('.winners-view') as HTMLElement;
      garageView.style.display = 'none';
      winnersView.style.display = 'block';
    });
  }
}
