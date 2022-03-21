import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'First Car',
      description: 'First Car description',
      daily_rate: 100,
      license_plate: 'Car-1111',
      fine_amount: 100,
      brand: 'FirstX',
      category_id: 'first_category',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'First Car',
      description: 'First Car description',
      daily_rate: 100,
      license_plate: 'Car-1111',
      fine_amount: 100,
      brand: 'FirstX',
      category_id: 'first_category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'FirstX',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'First Car',
      description: 'First Car description',
      daily_rate: 100,
      license_plate: 'Car-1111',
      fine_amount: 100,
      brand: 'FirstX',
      category_id: 'first_category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'First Car',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'First Car',
      description: 'First Car description',
      daily_rate: 100,
      license_plate: 'Car-1111',
      fine_amount: 100,
      brand: 'FirstX',
      category_id: 'an_category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'an_category_id',
    });

    expect(cars).toEqual([car]);
  });
});
