import './winners-table-head.scss';

export class WinnersTableHead {
  element: HTMLTableRowElement;

  idElement: HTMLTableCellElement;
  carElement: HTMLTableCellElement;
  nameElement: HTMLTableCellElement;
  winsElement: HTMLTableCellElement;
  winsElementTitle: HTMLSpanElement;
  timeElement: HTMLTableCellElement;
  timeElementTitle: HTMLSpanElement;

  constructor() {
    this.element = document.createElement('tr');
    this.element.classList.add('winners-table-heading');

    this.idElement = document.createElement('th');
    this.idElement.classList.add('winner-item-id');
    this.idElement.textContent = '№';

    this.carElement = document.createElement('th');
    this.carElement.classList.add('winner-item-car');
    this.carElement.textContent = 'Car';

    this.nameElement = document.createElement('th');
    this.nameElement.classList.add('winner-item-name');
    this.nameElement.textContent = 'Name';

    this.winsElement = document.createElement('th');
    this.winsElement.classList.add('winner-item-wins');
    this.winsElementTitle = document.createElement('span');
    this.winsElementTitle.textContent = 'Wins';

    this.timeElement = document.createElement('th');
    this.timeElement.classList.add('winner-item-time');
    this.timeElementTitle = document.createElement('span');
    this.timeElementTitle.textContent = 'Best time(seconds)';

    // append to parent
    this.appendToParent(this.winsElement, [this.winsElementTitle]);
    this.appendToParent(this.timeElement, [this.timeElementTitle]);
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
