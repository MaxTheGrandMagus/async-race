import { Button } from '../../base-components/button/button';
import { startEngine, stopEngine, switchToDrive } from '../../../services/api';
import { CarImage } from '../../../utils/car-image/car-image';
import { Car, Engine } from '../../../types';
import './garage-item.scss';

export class GarageItem {
  element: HTMLElement;

  carControls: HTMLElement;

  selectCarButton: Button;

  removeCarButton: Button;

  carName: HTMLElement;

  track: HTMLElement;

  trackLaunch: HTMLElement;

  trackFinish: HTMLElement;

  engineControls: HTMLElement;

  carImageWrapper: HTMLElement;

  startEngineButton: Button;

  stopEngineButton: Button;

  public car: Car;

  public speed: number;

  carAnimation: Animation | undefined;

  removeCar: (id: number) => void = () => {};

  selectCar: (id: number) => void = () => {};

  startEngine: (id: number) => void = () => {};

  stopEngine: () => void = () => {};

  constructor(car: Car) {
    this.element = document.createElement('li');
    this.element.classList.add('garage-item');

    this.car = car;
    this.speed = 0;

    this.carControls = document.createElement('div');
    this.carControls.classList.add('car-controls');
    this.selectCarButton = new Button(['select-car-btn'], null, 'select');
    this.selectCarButton.element.onclick = () => {
      if (car.id) this.selectCar(car.id);
    };
    this.removeCarButton = new Button(['remove-car-btn'], null, 'remove');
    this.removeCarButton.element.onclick = () => {
      if (car.id) this.removeCar(car.id);
      this.element.remove();
    };
    this.carName = document.createElement('span');
    this.carName.classList.add('car-name');
    this.carName.textContent = `${car.name}`;

    this.track = document.createElement('div');
    this.track.classList.add('track');
    this.trackLaunch = document.createElement('div');
    this.trackLaunch.classList.add('track-launch');
    this.engineControls = document.createElement('div');
    this.engineControls.classList.add('engine-controls');
    this.carImageWrapper = document.createElement('div');
    this.carImageWrapper.classList.add('car');
    this.carImageWrapper.innerHTML = CarImage(car.color);
    this.startEngineButton = new Button(['start-engine-btn'], null, 'A');
    this.startEngineButton.element.onclick = () => {
      if (car.id) this.startCarEngine(car.id);
    };
    this.stopEngineButton = new Button(['stop-engine-btn'], [{ name: 'disabled', value: '' }], 'B');
    this.stopEngineButton.element.onclick = () => {
      if (car.id) this.stopCarEngine(car.id);
    };
    this.trackFinish = document.createElement('div');
    this.trackFinish.classList.add('track-finish');

    // append to parent
    this.appendToParent(
      this.carControls,
      [this.selectCarButton.element, this.removeCarButton.element, this.carName],
    );
    this.appendToParent(
      this.engineControls,
      [this.startEngineButton.element, this.stopEngineButton.element],
    );
    this.appendToParent(this.trackLaunch, [this.engineControls, this.carImageWrapper]);
    this.appendToParent(this.track, [this.trackLaunch, this.trackFinish]);
    this.appendToParent(this.element, [this.carControls, this.track]);
  }

  async startCarEngine(id: number): Promise<void> {
    const data = await startEngine(id);
    if (data.status === 200) {
      this.startEngineButton.element.disabled = true;
      this.stopEngineButton.element.disabled = false;
      const { result } = data;
      const time = result.distance / result.velocity;
      this.animateCar(time);
      await this.switchToDriveMode(result);
    }
  }

  private async switchToDriveMode(car: Engine): Promise<void> {
    const data = await switchToDrive(this.car.id as number);
    return new Promise((resolve) => {
      if (data.success === false) {
        console.log(`${this.car.name} with id:${this.car.id} has been stopped suddenly. It's engine was broken down.`);
        this.carAnimation?.pause();
      }
      if (data.success === true) {
        this.speed = Math.floor(car.distance / car.velocity);
        resolve();
      }
    });
  }

  async stopCarEngine(id: number): Promise<void> {
    const data = await stopEngine(id);
    if (data.status === 200) {
      this.startEngineButton.element.disabled = false;
      this.stopEngineButton.element.disabled = true;
      this.speed = 0;
      this.carAnimation?.cancel();
      this.carImageWrapper.style.left = `${this.carImageWrapper.clientWidth}px`;
    }
  }

  private animateCar(time: number): void {
    this.carAnimation = this.carImageWrapper.animate(
      [{ left: '100px' }, { left: `calc(100% - ${this.carImageWrapper.clientWidth}px)` }],
      {
        duration: time,
        easing: 'ease-in-out',
      },
    );
    this.carAnimation.play();
    this.carAnimation.onfinish = () => {
      this.carImageWrapper.style.left = `calc(100% - ${this.carImageWrapper.clientWidth}px)`;
    };
  }

  private appendToParent(parentNode: HTMLElement, elements: HTMLElement[]) {
    elements.forEach((element) => parentNode.appendChild(element));
  }
}
