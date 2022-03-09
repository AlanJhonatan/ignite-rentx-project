import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const categoriesRepository = new CategoriesRepository();

const categoriesRoutes = Router();

categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepository.list();

  return response.json(all);
});

categoriesRoutes.post('/', (request, response) => createCategoryController.handle(request, response));

export { categoriesRoutes };
