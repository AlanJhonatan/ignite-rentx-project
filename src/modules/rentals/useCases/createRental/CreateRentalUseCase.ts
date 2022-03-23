import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expect_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expect_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHours = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id
    );

    if (carUnavailable) {
      throw new AppError('This Car is unavailable.', 400);
    }

    const alreadyIsOpen = await this.rentalsRepository.findOpenRentalByUserId(
      user_id
    );

    if (alreadyIsOpen) {
      throw new AppError('There is an Rental in progress for this user.', 400);
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expect_return_date
    );

    if (compare < minimumHours) {
      throw new AppError('Invalid return time. (The minimum time is 24 hours)');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expect_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
