import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should be able to add an new specification to an car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car One',
      description: 'One Description',
      brand: 'One Brand',
      daily_rate: 1,
      fine_amount: 1,
      category_id: 'One Category',
      license_plate: 'One License',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Spec 1',
      description: 'Spec 1 Description',
    });

    const specifications_id = [specification.id];

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationCars).toHaveProperty('specifications');
    expect(specificationCars.specifications.length).toBe(1);
    expect(specificationCars.specifications).toContain(specification);
  });

  it('should not be able to register an specification for an non existing car', async () => {
    const car_id = '1234';
    const specifications_id = ['1', '2'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError('This car does not exist.'));
  });

  // it('should be able to register only by admins users', () => {
  //   throw new Error('Method not implemented.');
  // });

  // it('should not be able to register an already existing specification for same car', () => {
  //   throw new Error('Method not implemented.');
  // });
});
