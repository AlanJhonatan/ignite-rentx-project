import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { importCategory } from '../modules/cars/useCases/importCategory';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.get('/', (request, response) => listCategoriesController().handle(request, response));
categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.post('/import', upload.single('file'), (request, response) => importCategory.handle(request, response));

export { categoriesRoutes };
