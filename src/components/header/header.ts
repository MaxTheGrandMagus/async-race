import './header.scss';

export class Header {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('header');
    this.element.classList.add('header');
    this.element.innerHTML = `
      <nav>
        <ul class="header__nav">
          <li>
            <a class="header__items" href="#garage">
              <p class="header__text">To Garage</p>
            </a>
          </li>
          <li>
            <a class="header__items" href="#winners">
              <p class="header__text">To Winners</p>
            </a>
          </li>
        </ul>
      </nav>
    `;
  }
}
