import './footer.scss';

export class Footer {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('footer');
    this.element.classList.add('footer');
    this.element.innerHTML = `
      <a class="author-url" href="https://github.com/MaxTheGrandMagus/async-race">
        <img src="https://www.svgrepo.com/show/361181/github.svg" alt="author">
      </a>
      <p class="copyright">
        Copyright 2022
      </p>
      <a class="course-url" href="https://rs.school/js/">
        <img src="https://rs.school/images/rs_school_js.svg" alt="course">
      </a>
    `;
  }
}
