import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { Router } from 'express';

import { app } from '../app';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.use(ensureAuthenticated);
rentalRoutes.post('/', createRentalController.handle);
rentalRoutes.post('/devolution/:id', devolutionRentalController.handle);
rentalRoutes.get('/user', listRentalsByUserController.handle);

export { rentalRoutes };
