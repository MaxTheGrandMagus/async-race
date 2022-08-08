import { Car, Cars, Engine, DriveStatus, Winner, Winners } from '../types';

const BASE_URL = 'http://127.0.0.1:3000';

const GARAGE_URL = `${BASE_URL}/garage`;
const ENGINE_URL = `${BASE_URL}/engine`;
const WINNERS_URL = `${BASE_URL}/winners`;

/* GARAGE */
const getCars = async (page = 1, limit = 7): Promise<Cars> => {
  try {
    const response = await fetch(`${GARAGE_URL}?_page=${page}&_limit=${limit}`);
    const items = await response.json();
    return {
      items: await Promise.all(items),
      count: response.headers.get('X-Total-Count'),
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getCar = async (id: number): Promise<Car> => {
  try {
    return (await fetch(`${GARAGE_URL}/${id}`)).json();
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const createCar = async (car: { name: string; color: string }): Promise<Car> => {
  try {
    return (
      await fetch(`${GARAGE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      })
    ).json();
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const deleteCar = async (id: number): Promise<void> => {
  try {
    return (
      await fetch(`${GARAGE_URL}/${id}`, {
        method: 'DELETE',
      })
    ).json();
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const updateCar = async (car: Car): Promise<Car> => {
  try {
    return (
      await fetch(`${GARAGE_URL}/${car.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: car.name, color: car.color }),
      })
    ).json();
  } catch (error) {
    throw new Error(`${error}`);
  }
};

/* ENGINE */
const startEngine = async (id: number): Promise<{ status: number; result: Engine }> => {
  try {
    const data = await fetch(`${ENGINE_URL}?id=${id}&status=started`, { method: 'PATCH' });
    const res: Engine = await data.json();
    return {
      status: data.status,
      result: res,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const switchToDrive = async (id: number): Promise<DriveStatus> => {
  const data = await fetch(`${ENGINE_URL}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return data.status !== 200 ? { success: false } : { ...(await data.json()) };
};

const stopEngine = async (id: number): Promise<{ status: number; result: Engine }> => {
  try {
    const data = await fetch(`${ENGINE_URL}?id=${id}&status=stopped`, { method: 'PATCH' });
    const res: Engine = await data.json();
    return {
      status: data.status,
      result: res,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

/* WINNERS */
const getWinnersSortOrder = (sort?: string | null, order?: string | null): string => {
  return sort && order ? `&_sort=${sort}&_order=${order}` : '';
};
const getWinners = async (page: number, limit = 10, sort?: string | null, order?: string | null): Promise<Winners> => {
  try {
    const response = await fetch(`${WINNERS_URL}?_page=${page}&_limit=${limit}${getWinnersSortOrder(sort, order)}`);
    const items = await response.json();
    return {
      items: await Promise.all(items),
      count: response.headers.get('X-Total-Count'),
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getWinner = async (id: number): Promise<{ status: number; result: Winner }> => {
  try {
    const data = await fetch(`${WINNERS_URL}/${id}`);
    const res: Winner = await data.json();
    return {
      status: data.status,
      result: res,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const createWinner = async (winner: Winner): Promise<Winner> => {
  try {
    return (
      await fetch(`${WINNERS_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(winner),
      })
    ).json();
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const deleteWinner = async (id: number): Promise<void> => {
  try {
    return (
      await fetch(`${WINNERS_URL}/${id}`, {
        method: 'DELETE',
      })
    ).json();
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const updateWinner = async (winner: Winner): Promise<Winner> => {
  try {
    return (
      await fetch(`${WINNERS_URL}/${winner.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wins: winner.wins, time: winner.time }),
      })
    ).json();
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
  startEngine,
  switchToDrive,
  stopEngine,
  getWinners,
  getWinner,
  createWinner,
  deleteWinner,
  updateWinner,
};
