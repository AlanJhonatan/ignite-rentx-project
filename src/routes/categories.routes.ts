import { Router } from 'express';

import { PostgresCategoriesRepositories } from '../repositories/PostgresCategoriesRepositories';

// import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

// const categoriesRepository = new CategoriesRepository();
const categoriesRepository = new PostgresCategoriesRepositories();

const categoriesRoutes = Router();

categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepository.list();

  return response.json(all);
});

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

export { categoriesRoutes };
