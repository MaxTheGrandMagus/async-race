/* eslint-disable @typescript-eslint/no-empty-function */
import { Form } from '../../base-components/form/form';
import { Input } from '../../base-components/input/input';
import { Button } from '../../base-components/button/button';
import { Car, CreateCar } from '../../../types';
import './garage-forms.scss';

export class GarageForms {
  element: HTMLElement;
  carState = {
    name: '',
    color: '#ffffff',
  };

  createCarForm: Form;
  createCarInputName: Input;
  createCarInputColor: Input;
  createCarButton: Button;
  createCar: (car: CreateCar) => void = () => {};

  updateCarForm: Form;
  updateCarInputName: Input;
  updateCarInputColor: Input;
  updateCarButton: Button;
  updateCar: (car: Car) => void = () => {};

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('forms-container');

    // create form
    this.createCarForm = new Form(['form', 'create-car-form'], [{ name: 'id', value: 'create-car-form' }]);
    this.createCarInputName = new Input(
      ['create-car-name'],
      [
        { name: 'id', value: 'create-car-name' },
        { name: 'name', value: 'name' },
        { name: 'type', value: 'text' },
        { name: 'placeholder', value: 'Enter car name...' },
        { name: 'required', value: 'true' },
      ]
    );
    this.createCarInputName.getInputValue = (event) => this.updateState('name', event, this.createCarButton.element);
    this.createCarInputColor = new Input(
      ['create-car-color'],
      [
        { name: 'id', value: 'create-car-color' },
        { name: 'name', value: 'color' },
        { name: 'type', value: 'color' },
        { name: 'value', value: '#ffffff' },
      ]
    );
    this.createCarInputColor.getInputValue = (event) => this.updateState('color', event, this.createCarButton.element);
    this.createCarButton = new Button(
      ['button'],
      [
        { name: 'id', value: 'create-car-btn' },
        { name: 'type', value: 'submit' },
        { name: 'disabled', value: '' },
      ],
      'Create'
    );
    this.createCarButton.element.onclick = (event) => {
      event.preventDefault();
      this.createCar(this.carState);
      this.resetForm(this.createCarInputName.element, this.createCarInputColor.element, this.createCarButton.element);
    };
    this.appendToParent(this.createCarForm.element, [
      this.createCarInputName.element,
      this.createCarInputColor.element,
      this.createCarButton.element,
    ]);

    // update form
    this.updateCarForm = new Form(['form', 'update-car-form'], [{ name: 'id', value: 'update-car-form' }]);
    this.updateCarInputName = new Input(
      ['update-car-name'],
      [
        { name: 'id', value: 'update-car-name' },
        { name: 'name', value: 'name' },
        { name: 'type', value: 'text' },
        { name: 'placeholder', value: 'Enter car name...' },
        { name: 'required', value: 'true' },
        { name: 'disabled', value: '' },
      ]
    );
    this.updateCarInputName.getInputValue = (event) => this.updateState('name', event, this.updateCarButton.element);
    this.updateCarInputColor = new Input(
      ['update-car-color'],
      [
        { name: 'id', value: 'update-car-color' },
        { name: 'name', value: 'color' },
        { name: 'type', value: 'color' },
        { name: 'value', value: '#ffffff' },
        { name: 'disabled', value: '' },
      ]
    );
    this.updateCarInputColor.getInputValue = (event) => this.updateState('color', event, this.updateCarButton.element);
    this.updateCarButton = new Button(
      ['button'],
      [
        { name: 'id', value: 'update-car-btn' },
        { name: 'type', value: 'submit' },
        { name: 'disabled', value: '' },
      ],
      'Update'
    );
    this.updateCarButton.element.onclick = (event) => {
      event.preventDefault();
      this.updateCar(this.carState);
      this.resetForm(this.updateCarInputName.element, this.updateCarInputColor.element, this.updateCarButton.element);
    };
    this.appendToParent(this.updateCarForm.element, [
      this.updateCarInputName.element,
      this.updateCarInputColor.element,
      this.updateCarButton.element,
    ]);

    // append to parent
    this.appendToParent(this.element, [this.createCarForm.element, this.updateCarForm.element]);
  }

  updateState(key: keyof CreateCar, event: Event, button: HTMLButtonElement): void {
    const input = event.target as HTMLInputElement;
    this.carState[key] = input.value;
    button.toggleAttribute('disabled', this.carState.name === '');
  }

  resetForm(inputName: HTMLInputElement, inputColor: HTMLInputElement, button: HTMLButtonElement): void {
    this.carState = {
      name: '',
      color: '#ffffff',
    };
    this.updateInputs(inputName, inputColor, button);
  }

  updateInputs(inputName: HTMLInputElement, inputColor: HTMLInputElement, button: HTMLButtonElement): void {
    inputName.value = this.carState.name;
    inputColor.value = this.carState.color;
    if (inputName === this.updateCarInputName.element && inputColor === this.updateCarInputColor.element) {
      this.updateCarInputName.element.setAttribute('disabled', '');
      this.updateCarInputColor.element.setAttribute('disabled', '');
    }
    button.setAttribute('disabled', '');
  }

  private appendToParent(parentNode: HTMLElement, elements: HTMLElement[]) {
    elements.forEach((element) => parentNode.appendChild(element));
  }
}
