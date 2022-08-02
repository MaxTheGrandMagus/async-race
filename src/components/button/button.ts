import './button.scss';

export class Button {
  element: HTMLButtonElement;

  constructor(text: string) {
    this.element = document.createElement('button');
    this.element.classList.add('button');
    this.element.textContent = Button.addText(text);
  }

  static addText(text: string) {
    return `${text}`;
  }
}
