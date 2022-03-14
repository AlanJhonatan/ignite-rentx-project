import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController';

const specificationsRoutes = Router();

const createSpecification = new CreateSpecificationController();
const listSpecifications = new ListSpecificationsController();

specificationsRoutes.get('/', listSpecifications.handle);
specificationsRoutes.post('/', createSpecification.handle);

export { specificationsRoutes };
