/* eslint-disable @typescript-eslint/no-empty-function */
import { CarImage } from '../../../utils/car-image/car-image';
import { WinnerCar } from '../../../types';
import './winners-item.scss';

export class WinnersItem {
  element: HTMLTableRowElement;

  idElement: HTMLTableCellElement;
  carElement: HTMLTableCellElement;
  nameElement: HTMLTableCellElement;
  winsElement: HTMLTableCellElement;
  timeElement: HTMLTableCellElement;

  public winner: WinnerCar | undefined;

  constructor(winner: WinnerCar) {
    this.element = document.createElement('tr');
    this.element.classList.add('winner-item');
    this.element.dataset.key = winner.id.toString();

    this.idElement = document.createElement('td');
    this.idElement.innerHTML = winner.id.toString();

    this.carElement = document.createElement('td');
    this.carElement.innerHTML = CarImage(winner.color);

    this.nameElement = document.createElement('td');
    this.nameElement.textContent = winner.name;

    this.winsElement = document.createElement('td');
    this.winsElement.textContent = winner.wins.toString();

    this.timeElement = document.createElement('td');
    this.timeElement.textContent = winner.time.toString();

    // append to parent
    this.appendToParent(this.element, [
      this.idElement,
      this.carElement,
      this.nameElement,
      this.winsElement,
      this.timeElement,
    ]);
  }

  private appendToParent(parentNode: HTMLElement, elements: HTMLElement[]) {
    elements.forEach((element) => parentNode.appendChild(element));
  }
}
