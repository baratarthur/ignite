import { ISpecificationRepository } from "../repositories/Ispecification.repository";


interface IRequest {
    name: string,
    description: string
}

class CreateSpecificationService {
    constructor(private specificationsRepository: ISpecificationRepository) {}
    
    execute({ name, description }: IRequest) {
        if (!this.specificationsRepository.findByName(name))
            this.specificationsRepository.create({
                name, description
            })
        else
            throw new Error("Specification already exists");
    }
}

export { CreateSpecificationService }
