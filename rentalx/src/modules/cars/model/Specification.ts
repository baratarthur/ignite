import { v4 as uuID } from 'uuid';

class Specification {
    id?: string;
    name?: string;
    description?: string;
    created_at?: Date;

    constructor() {
        if(!this.id) {
            this.id = uuID();
        }
    }
}

export { Specification }
