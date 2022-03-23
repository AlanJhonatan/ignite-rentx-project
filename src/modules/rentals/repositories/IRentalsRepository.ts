import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  create({
    id,
    end_date,
    total,
    user_id,
    car_id,
    expect_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCarId(car_id: string): Promise<Rental>;
  findOpenRentalByUserId(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
}

export { IRentalsRepository };
