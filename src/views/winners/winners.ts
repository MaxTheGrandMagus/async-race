import { WinnersContainer } from '../../components/winners-components/winners-container/winners-container';
import { getWinners } from '../../services/api';
import './winners.scss';

export class Winners {
  element: HTMLElement;

  winnersContainer: WinnersContainer;

  page = 1;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('winners-view');

    this.winnersContainer = new WinnersContainer();
    this.winnersContainer.updatePage = (page: number) => {
      this.page = page;
      this.winnersGetWinners(this.page);
    };
    this.winnersContainer.sortWinners = (type, order) => {
      this.winnersGetWinners(this.page, 10, type, order);
    };

    this.addToView([this.winnersContainer.element]);

    this.winnersGetWinners();
  }

  async winnersGetWinners(page = 1, limit = 10, sort = 'id', order = 'ASC'): Promise<void> {
    const winners = await getWinners(page, limit, sort, order);
    this.winnersContainer.renderWinners(winners);
    this.winnersContainer.pagination.updateNextButton(this.page, Number(winners.count), 10);
  }

  private addToView(viewData: HTMLElement[]) {
    viewData.forEach((viewElement) => this.element.appendChild(viewElement));
  }
}
