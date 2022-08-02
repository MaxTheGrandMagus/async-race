import { View } from './../../components/view/view';

export class Garage {
  element: HTMLElement;

  private readonly view: View;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('garage-view');

    this.view = new View();
  }
}
