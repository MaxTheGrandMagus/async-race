import { View } from './../../components/view/view';

export class Winners {
  element: HTMLElement;

  private readonly view: View;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('winners-view');

    this.view = new View();
  }
}
