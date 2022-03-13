import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const categoryRepository = null; // new CategoriesRepository();
const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);
const importCategory = new ImportCategoryController(importCategoryUseCase);

export { importCategory };
