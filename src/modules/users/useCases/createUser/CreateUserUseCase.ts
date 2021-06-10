import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    name: string;
    email: string;
}

class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ email, name }: IRequest): User {
        const userEmailAlreadyExists = this.usersRepository.findByEmail(email);

        if (userEmailAlreadyExists) {
            throw new Error("Already exists an user with this e-mail address");
        }

        const user = this.usersRepository.create({ name, email });

        return user;
    }
}

export { CreateUserUseCase };
