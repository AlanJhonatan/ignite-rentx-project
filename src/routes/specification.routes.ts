import { Router } from 'express';

import createSpecification from '../modules/cars/useCases/createSpecification';
import listSpecifications from '../modules/cars/useCases/listSpecifications';

const specificationsRoutes = Router();

specificationsRoutes.get('/', (request, response) => listSpecifications().handle(request, response));
specificationsRoutes.post('/', (request, response) => createSpecification().handle(request, response));

export { specificationsRoutes };
