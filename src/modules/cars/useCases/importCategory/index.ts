import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const importCategoryUseCase = new ImportCategoryUseCase();
const importCategory = new ImportCategoryController(importCategoryUseCase);

export { importCategory };
