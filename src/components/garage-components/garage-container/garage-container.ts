/* eslint-disable @typescript-eslint/no-empty-function */
import { Pagination } from '../../pagination/pagination';
import { GarageItem } from '../garage-item/garage-item';
import { Cars } from '../../../types';
import './garage-container.scss';

export class GarageContainer {
  element: HTMLElement;
  garageItemList: HTMLElement;

  title: HTMLElement;
  pagination: Pagination;

  cars: Array<GarageItem>;

  selectCar: (id: number) => void = () => {};
  removeCar: (id: number) => void = () => {};
  updatePage: (page: number) => void = () => {};

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('garage-container');

    this.garageItemList = document.createElement('ul');
    this.garageItemList.classList.add('garage-items');

    this.cars = [];

    this.title = document.createElement('h1');
    this.title.classList.add('garage-title');

    this.pagination = new Pagination();
    this.pagination.updatePage = (page) => this.updatePage(page);

    // append to parent
    this.appendToParent(this.element, [this.title, this.pagination.element, this.garageItemList]);
  }

  renderCars(cars: Cars) {
    this.garageItemList.innerHTML = '';
    this.cars = [];
    this.title.textContent = `Garage (${cars.count})`;
    this.cars = cars.items.map((car) => {
      const item = new GarageItem(car);
      item.removeCar = (id) => this.removeCar(id);
      item.selectCar = (id) => this.selectCar(id);
      this.garageItemList.appendChild(item.element);
      return item;
    });
  }

  private appendToParent(parentNode: HTMLElement, elements: HTMLElement[]) {
    elements.forEach((element) => parentNode.appendChild(element));
  }
}
