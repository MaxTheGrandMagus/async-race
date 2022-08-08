type Car = {
  id?: number;
  name: string;
  color: string;
};

interface Cars {
  items: Array<Car>;
  count: string | null;
}

type CreateCar = {
  name: string;
  color: string;
};

type Winner = {
  id: number;
  wins: number;
  time: number;
};

interface Winners {
  items: Array<Winner>;
  count: string | null;
}

type Engine = {
  velocity: number;
  distance: number;
};

type DriveStatus = {
  success: boolean;
};

type RaceWinner = {
  id: number;
  name: string;
  color: string;
  speed: number;
  wins: number;
  time?: number;
};

interface HTMLAttributes {
  name: string;
  value: string;
}

export { Car, Cars, CreateCar, Winner, Winners, Engine, DriveStatus, RaceWinner, HTMLAttributes };
