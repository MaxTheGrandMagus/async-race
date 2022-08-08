/* eslint-disable @typescript-eslint/no-empty-function */
import { Pagination } from '../../pagination/pagination';
import { WinnersTableHead } from '../winners-table-head/winners-table-head';
import { WinnersItem } from '../winners-item/winners-item';
import { Car, Winner, WinnerCar, Winners } from '../../../types';
import './winners-container.scss';
import { getCar } from '../../../services/api';

export class WinnersContainer {
  element: HTMLElement;

  title: HTMLElement;
  pagination: Pagination;
  headingRowElement: WinnersTableHead;
  tableElement: HTMLTableElement;

  winners: Array<Winner> = [];

  updatePage: (page: number) => void = () => {};
  sortWinners: (type: string, order: string) => void = () => {};

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('winners-container');

    this.title = document.createElement('h1');
    this.title.classList.add('winners-title');

    this.pagination = new Pagination();
    this.pagination.updatePage = (page) => this.updatePage(page);

    this.tableElement = document.createElement('table');
    this.tableElement.classList.add('winners-table');

    this.headingRowElement = new WinnersTableHead();
    this.headingRowElement.idElement.addEventListener('click', () => {
      this.containerSortWinners(this.headingRowElement.idElement, 'id');
    });
    this.headingRowElement.winsElement.addEventListener('click', () => {
      this.containerSortWinners(this.headingRowElement.winsElement, 'wins');
    });
    this.headingRowElement.timeElement.addEventListener('click', () => {
      this.containerSortWinners(this.headingRowElement.timeElement, 'time');
    });

    // append to parent
    this.appendToParent(this.tableElement, [this.headingRowElement.element]);
    this.appendToParent(this.element, [this.title, this.pagination.element, this.tableElement]);
  }

  renderWinners(winners: Winners) {
    this.winners = [];
    this.tableElement.innerHTML = '';
    this.title.textContent = `Winners (${winners.count})`;
    this.tableElement.appendChild(this.headingRowElement.element);
    this.winners = winners.items;
    this.winners.forEach(async (winner) => {
      const car: Car = await this.ApiGetCar(winner.id);
      const winnerCarData: WinnerCar = {
        id: winner.id,
        name: car.name,
        color: car.color,
        wins: winner.wins,
        time: winner.time,
      };
      const item = new WinnersItem(winnerCarData);
      this.tableElement.appendChild(item.element);
    });
  }

  private containerSortWinners(element: Element, type: string) {
    element.classList.toggle('sort-toggled');
    if (element.classList.contains('sort-toggled')) {
      this.sortWinners(type, 'ASC');
    } else {
      this.sortWinners(type, 'DESC');
    }
  }

  private async ApiGetCar(id: number) {
    const data = await getCar(id);
    return data;
  }

  private appendToParent(parentNode: HTMLElement, elements: HTMLElement[]) {
    elements.forEach((element) => parentNode.appendChild(element));
  }
}
