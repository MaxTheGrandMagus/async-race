import { Button } from '../../base-components/button/button';
import './garage-controls.scss';

export class GarageControls {
  element: HTMLElement;

  raceButton: Button;

  resetButton: Button;

  generateButton: Button;

  raceCars: () => void = () => {};

  resetCars: () => void = () => {};

  generateCars: () => void = () => {};

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('controls-container');

    this.raceButton = new Button(['button', 'race-btn'], [{ name: 'id', value: 'race-btn' }], 'Race');
    this.raceButton.element.onclick = () => this.raceCars();

    this.resetButton = new Button(
      ['button', 'reset-btn'],
      [
        { name: 'id', value: 'reset-btn' },
        { name: 'disabled', value: '' },
      ],
      'Reset',
    );
    this.resetButton.element.onclick = () => this.resetCars();

    this.generateButton = new Button(['button', 'generate-btn'], [{ name: 'id', value: 'generate-btn' }], 'Generate');
    this.generateButton.element.onclick = () => this.generateCars();

    // append to parent
    this.appendToParent(
      this.element,
      [this.raceButton.element, this.resetButton.element, this.generateButton.element],
    );
  }

  private appendToParent(parentNode: HTMLElement, elements: HTMLElement[]) {
    elements.forEach((element) => parentNode.appendChild(element));
  }
}
