import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { ListSpecificationsController } from './ListSpecificationsController';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

export default () => {
  const specificationsRepository = new SpecificationsRepository();
  const listSpecificationsUseCase = new ListSpecificationsUseCase(specificationsRepository);
  const listSpecifications = new ListSpecificationsController(listSpecificationsUseCase);

  return listSpecifications;
};
