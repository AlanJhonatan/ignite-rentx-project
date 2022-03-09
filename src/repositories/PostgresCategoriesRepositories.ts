import { Category } from '../model/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from './ICategoriesRepository';

class PostgresCategoriesRepositories implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log('findByName', { name });
    return null;
  }
  list(): Category[] {
    console.log('list');
    return null;
  }
  create({ name, description }: ICreateCategoryDTO): void {
    console.log('create', { name, description });
    return null;
  }
}

export { PostgresCategoriesRepositories };
