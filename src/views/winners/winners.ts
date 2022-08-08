import './winners.scss';

export class Winners {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('winners-view');
  }

  private addToView(viewData: HTMLElement[]) {
    viewData.forEach((viewElement) => this.element.appendChild(viewElement));
  }
}
