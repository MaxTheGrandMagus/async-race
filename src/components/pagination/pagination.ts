/* eslint-disable @typescript-eslint/no-empty-function */
import { Button } from '../base-components/button/button';

import './pagination.scss';

export class Pagination {
  element: HTMLElement;

  private page = 1;
  private title: HTMLElement;
  prevPageButton: Button;
  nextPageButton: Button;

  updatePage: (page: number) => void = () => {};

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('pagination');

    this.title = document.createElement('h2');
    this.title.classList.add('pagination-title');
    this.title.textContent = `Page #${this.page}`;

    this.prevPageButton = new Button(['pagination-btn-prev'], [{ name: 'disabled', value: '' }], 'Prev');
    this.prevPageButton.element.onclick = () => this.switchPage('prev');

    this.nextPageButton = new Button(['pagination-btn-next'], null, 'Next');
    this.nextPageButton.element.onclick = () => this.switchPage('next');

    // append to parent
    this.appendToParent(this.element, [this.title, this.prevPageButton.element, this.nextPageButton.element]);
  }

  updateNextButton(page: number, totalCount: number, limit: number) {
    if (page >= totalCount / limit) {
      this.nextPageButton.element.disabled = true;
    } else {
      this.nextPageButton.element.disabled = false;
    }
  }

  private updatePrevButton() {
    if (this.page === 1) {
      this.prevPageButton.element.disabled = true;
    } else {
      this.prevPageButton.element.disabled = false;
    }
  }

  private switchPage(type: string) {
    if (type === 'prev') {
      if (this.page > 1) this.page--;
    }
    if (type === 'next') this.page++;
    this.title.textContent = `Page #${this.page}`;
    this.updatePage(this.page);
    this.updatePrevButton();
  }

  private appendToParent(parentNode: HTMLElement, elements: HTMLElement[]) {
    elements.forEach((element) => parentNode.appendChild(element));
  }
}
