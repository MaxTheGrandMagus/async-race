import { HTMLAttributes } from '../../../types';
import './button.scss';

export class Button {
  element: HTMLButtonElement;

  constructor(styles: string[] = [], attributes: null | HTMLAttributes[] = [], text: string) {
    this.element = document.createElement('button');
    this.element.classList.add(...styles);
    if (attributes) {
      attributes.forEach((attribute) => this.element.setAttribute(attribute.name, attribute.value));
    }
    this.element.textContent = Button.addText(text);
  }

  static addText(text: string) {
    return `${text}`;
  }
}
