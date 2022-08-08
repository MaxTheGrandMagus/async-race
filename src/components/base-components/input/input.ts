import { HTMLAttributes } from '../../../types';
import './input.scss';

export class Input {
  element: HTMLInputElement;

  getInputValue: (event: Event) => void = () => {};

  constructor(styles: string[] = [], attributes: null | HTMLAttributes[] = []) {
    this.element = document.createElement('input');
    this.element.classList.add(...styles);
    this.element.addEventListener('input', (event) => this.getInputValue(event));
    if (attributes) {
      attributes.forEach((attribute) => this.element.setAttribute(attribute.name, attribute.value));
    }
  }
}
