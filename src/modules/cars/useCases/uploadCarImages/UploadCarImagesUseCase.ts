import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { CarsImagesRepository } from '@modules/cars/repositories/in-memory/CarsImagesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: CarsImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<CarImage[]> {
    const carsImages = images_name.map(async (image_name) => {
      const carImage = await this.carsImagesRepository.create(
        car_id,
        image_name
      );

      return carImage;
    });

    const createdCarsImages = await Promise.all(carsImages);

    return createdCarsImages;
  }
}

export { UploadCarImagesUseCase };
