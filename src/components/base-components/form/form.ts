import { HTMLAttributes } from '../../../types';
import './form.scss';

export class Form {
  element: HTMLFormElement;

  constructor(styles: string[] = [], attributes: null | HTMLAttributes[] = []) {
    this.element = document.createElement('form');
    this.element.classList.add(...styles);
    if (attributes) {
      attributes.forEach((attribute) => this.element.setAttribute(attribute.name, attribute.value));
    }
  }
}
