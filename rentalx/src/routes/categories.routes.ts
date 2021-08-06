import { Router } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/categories.repository';
import { CreateCategorieService } from '../modules/cars/services/categories.create';

const categoryRoutes = Router();
const repo = new CategoriesRepository();

categoryRoutes.post("/", (req, res) => {
    const { name, description } = req.body;
    const createCategoryService = new  CreateCategorieService(repo);
    createCategoryService.execute({name, description});
    return res.status(201).send();
});

categoryRoutes.get("/all", (req, res) => {
    const list = repo.list();
    return res.json(list);
});

export { categoryRoutes };
