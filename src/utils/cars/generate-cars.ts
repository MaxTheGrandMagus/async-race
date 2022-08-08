import { brandsCars, modelsCars } from './cars';
import { CreateCar } from '../../types';

const colorsPattern = '0123456789abcdef';

const generateRandomCarName = () => {
  const brand = brandsCars[Math.floor(Math.random() * brandsCars.length)];
  const model = modelsCars[Math.floor(Math.random() * modelsCars.length)];
  return `${brand} ${model}`;
};

const generateRandomCarColor = () => {
  let carColor = '#';
  for (let i = 0; i < 6; i += 1) {
    carColor += colorsPattern[Math.floor(Math.random() * 16)];
  }
  return carColor;
};

export const generateRandomCars = (carCount = 100): Array<CreateCar> => new Array(carCount)
  .fill(1).map(() => ({
    name: generateRandomCarName(),
    color: generateRandomCarColor(),
  }));
