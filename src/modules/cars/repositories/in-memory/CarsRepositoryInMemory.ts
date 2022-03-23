import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });

    return cars;
  }

  async create({
    id,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === licensePlate);
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === id);

    this.cars[carIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
