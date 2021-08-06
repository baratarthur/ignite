import { Category } from '../model/Category';

interface ICreateCategoryDTO {
    name: string,
    description: string
}

interface ICategoryRepository {
    findByName(name: string): Category | undefined;
    list(): Category[];
    create(data: ICreateCategoryDTO): void;
}

export { ICategoryRepository, ICreateCategoryDTO }
