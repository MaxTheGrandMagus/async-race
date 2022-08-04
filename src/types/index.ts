type Car = {
  id: number;
  name: string;
  color: string;
};

interface Cars {
  items: Array<Car>;
  count: string | null;
}

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

interface HTMLAttributes {
  name: string;
  value: string;
}

export { Car, Cars, Winner, Winners, Engine, DriveStatus, HTMLAttributes };
