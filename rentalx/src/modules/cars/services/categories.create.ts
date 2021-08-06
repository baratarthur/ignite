import { ICategoryRepository } from "../repositories/Icategories.repository";

interface IRequest {
    name: string,
    description: string
}

class CreateCategorieService {
    constructor(private repo: ICategoryRepository) {}

    execute({ name, description }: IRequest) {
        if(this.repo.findByName(name))
            throw new Error("Category already exists");

        this.repo.create({ name, description });
    }
}

export { CreateCategorieService };
