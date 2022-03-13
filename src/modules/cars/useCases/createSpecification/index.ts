import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

export default () => {
  const specificationRepository = new SpecificationsRepository();
  const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository);
  const createSpecification = new CreateSpecificationController(createSpecificationUseCase);

  return createSpecification;
};
