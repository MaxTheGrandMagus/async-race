import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Garage } from './views/garage/garage';
import { Winners } from './views/winners/winners';

export class App {
  private readonly header: Header;
  private readonly garage: Garage;
  private readonly winners: Winners;
  private readonly footer: Footer;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.garage = new Garage();
    this.winners = new Winners();
    this.footer = new Footer();
  }

  start() {
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.garage.element);
    this.rootElement.appendChild(this.winners.element);
    this.rootElement.appendChild(this.footer.element);
  }
}
