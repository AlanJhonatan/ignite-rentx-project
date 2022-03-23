import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import dayjs from 'dayjs';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );

    await carsRepositoryInMemory.create({
      id: 'car-1111',
      brand: 'Honda',
      category_id: '1',
      name: 'Civic',
      license_plate: 'ABC-1234',
      description: 'Civic',
      daily_rate: 100,
      fine_amount: 100,
    });
  });

  it('should be able to create an new rental', async () => {
    const createdRental = await createRentalUseCase.execute({
      user_id: 'user-1111',
      car_id: 'car-1111',
      expect_return_date: dayAdd24Hours,
    });

    expect(createdRental).toHaveProperty('id');
  });

  it('should be not able to register an new rental if the car is unavailable', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'user-1111',
        car_id: 'car-1111',
        expect_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: 'user-2222',
        car_id: 'car-1111',
        expect_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to register an rental if user has an rental open', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'user-1111',
        car_id: 'car-1111',
        expect_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: 'user-1111',
        car_id: 'car-2222',
        expect_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to register an new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'user-1111',
        car_id: 'car-2222',
        expect_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
