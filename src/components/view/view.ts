export class View {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('view');
  }

  addToView(viewData: HTMLElement[]) {
    viewData.forEach((viewElement) => this.element.appendChild(viewElement));
  }
}
