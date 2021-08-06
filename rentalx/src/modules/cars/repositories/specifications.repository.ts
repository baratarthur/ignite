import { Specification } from '../model/Specification';
import { ISpecificationDTO, ISpecificationRepository } from './Ispecification.repository';

class SpecificationsRepository implements ISpecificationRepository {
    private specifications: Specification[];
    
    constructor() {
        this.specifications = [];
    }

    findByName(name: string): Specification | undefined {
        const specification = this.specifications.find(
            specification => specification.name === name
        );

        return specification;
    }

    create({ name, description }: ISpecificationDTO): void {
        const specification = new Specification();

        Object.assign(
            specification,
            { name, description }
        );

        this.specifications.push(specification);
    }
}

export { SpecificationsRepository }
