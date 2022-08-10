import { GarageForms } from '../../components/garage-components/garage-forms/garage-forms';
import { GarageControls } from '../../components/garage-components/garage-controls/garage-controls';
import { GarageContainer } from '../../components/garage-components/garage-container/garage-container';
import { GarageWinnerModal } from '../../components/garage-components/garage-winner-modal/garage-winner-modal';
import { GarageItem } from '../../components/garage-components/garage-item/garage-item';
import {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
  createWinner,
  getWinner,
  updateWinner,
  deleteWinner,
} from '../../services/api';
import { generateRandomCars } from '../../utils/cars/generate-cars';
import {
  Car, CreateCar, RaceWinner, Winner,
} from '../../types';
import './garage.scss';
import { Winners } from '../winners/winners';

export class Garage {
  element: HTMLElement;

  private garageForms: GarageForms;

  private garageControls: GarageControls;

  private garageContainer: GarageContainer;

  private garageWinnerModal: GarageWinnerModal | undefined;

  page = 1;

  winners = new Winners();

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('garage-view');

    this.garageForms = new GarageForms();
    this.garageForms.createCar = async (car) => {
      await this.garageCreateCar(car);
      await this.garageGetCars(this.page);
    };
    this.garageForms.updateCar = (car) => this.garageUpdateCar(car);

    this.garageControls = new GarageControls();
    this.garageControls.raceCars = () => this.garageRaceCars();
    this.garageControls.resetCars = () => this.garageResetCars();
    this.garageControls.generateCars = () => this.garageGenerateCars();

    this.garageContainer = new GarageContainer();
    this.garageContainer.updatePage = (page) => {
      this.page = page;
      this.garageGetCars(page);
    };
    this.garageContainer.selectCar = (id) => this.garageGetCar(id);
    this.garageContainer.removeCar = (id) => this.garageRemoveCar(id);

    this.addToView([
      this.garageForms.element,
      this.garageControls.element,
      this.garageContainer.element,
    ]);

    this.garageGetCars(this.page);
  }

  private async garageGetCars(page: number): Promise<void> {
    const data = await getCars(page);
    if (data) {
      this.garageContainer.renderCars(data);
      this.garageContainer.pagination.updateNextButton(this.page, Number(data.count), 7);
    }
  }

  private async garageGetCar(id: number): Promise<void> {
    const car = await getCar(id);
    if (car) {
      this.garageForms.carState = car;
      this.garageForms.updateInputs(
        this.garageForms.updateCarInputName.element,
        this.garageForms.updateCarInputColor.element,
        this.garageForms.updateCarButton.element,
      );
      this.garageForms.updateCarInputName.element.removeAttribute('disabled');
      this.garageForms.updateCarInputColor.element.removeAttribute('disabled');
      this.garageForms.updateCarButton.element.removeAttribute('disabled');
    }
  }

  private async garageCreateCar(car: CreateCar): Promise<void> {
    await createCar(car);
  }

  private async garageUpdateCar(car: Car): Promise<void> {
    await updateCar(car);
    await this.garageGetCars(this.page);
  }

  private async garageRemoveCar(id: number): Promise<void> {
    await deleteCar(id);
    await deleteWinner(id);
    await this.garageGetCars(this.page);
    const winnersView = document.querySelector('.winners-view') as HTMLElement;
    await this.winners.winnersGetWinners();
    (winnersView.parentNode as HTMLElement).replaceChild(this.winners.element, winnersView);
  }

  private async garageRaceCars(): Promise<void> {
    this.garageControls.raceButton.element.disabled = true;
    this.garageControls.generateButton.element.disabled = true;
    const carsRace: Array<Promise<GarageItem>> = this.garageContainer.cars
      .map(async (garageItem) => {
        await garageItem.startCarEngine(garageItem.car.id as number);
        garageItem.startEngineButton.element.disabled = true;
        garageItem.stopEngineButton.element.disabled = false;
        return garageItem;
      });
    const winner = await Promise.race(carsRace);
    const winnerData: RaceWinner = {
      id: winner.car.id as number,
      name: winner.car.name,
      color: winner.car.color,
      speed: winner.speed,
      wins: 1,
      time: +(winner.speed / 1000).toFixed(2),
    };
    this.garageWinnerModal = new GarageWinnerModal(winnerData);
    this.element.appendChild(this.garageWinnerModal.element);
    this.garageControls.resetButton.element.removeAttribute('disabled');
    setTimeout(() => this.garageWinnerModal?.element.remove(), 5000);
    await this.garageCreateOrUpdateWinner({
      id: winnerData.id,
      wins: winnerData.wins,
      time: winnerData.time,
    });
  }

  private garageResetCars(): void {
    this.garageControls.resetButton.element.disabled = true;
    const carsReset = this.garageContainer.cars.map(async (garageItem) => {
      await garageItem.stopCarEngine(garageItem.car.id as number);
    });
    Promise.all(carsReset).then(() => {
      this.garageControls.raceButton.element.removeAttribute('disabled');
      this.garageControls.generateButton.element.removeAttribute('disabled');
    });
  }

  private async garageGenerateCars(): Promise<void> {
    this.garageControls.raceButton.element.disabled = true;
    this.garageControls.generateButton.element.disabled = true;
    const generatedCars = generateRandomCars();
    await Promise.all(generatedCars.map(async (car) => this.garageCreateCar(car)));
    await this.garageGetCars(this.page);
    this.garageControls.raceButton.element.disabled = false;
    this.garageControls.generateButton.element.disabled = false;
  }

  private async garageCreateWinner(winner: Winner) {
    await createWinner({
      id: winner.id,
      wins: 1,
      time: winner.time,
    });
  }

  private async garageUpdateWinner(winner: Winner) {
    await updateWinner({
      id: winner.id,
      wins: winner.wins,
      time: winner.time,
    });
  }

  private async garageCreateOrUpdateWinner(winner: Winner): Promise<void> {
    const getWinnerCar = await getWinner(winner.id);
    if (getWinnerCar.status === 200) {
      getWinnerCar.result.wins += 1;
      winner.wins = getWinnerCar.result.wins;
      await this.garageUpdateWinner(winner);
    } else {
      await this.garageCreateWinner(winner);
    }
    const winnersView = document.querySelector('.winners-view') as HTMLElement;
    await this.winners.winnersGetWinners();
    (winnersView.parentNode as HTMLElement).replaceChild(this.winners.element, winnersView);
  }

  private addToView(viewData: HTMLElement[]) {
    viewData.forEach((viewElement) => this.element.appendChild(viewElement));
  }
}
