import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { importCategory } from '../modules/cars/useCases/importCategory';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.post('/import', upload.single('file'), (request, response) => importCategory.handle(request, response));

export { categoriesRoutes };
