import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { getRepository, Repository } from 'typeorm';

import { Rental } from '../typeorm/entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    id,
    end_date,
    total,
    user_id,
    car_id,
    expect_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      end_date,
      total,
      car_id,
      user_id,
      expect_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });
    return openByCar;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });
    return openByUser;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findAllByUserId(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });
    return rentals;
  }
}

export { RentalsRepository };
