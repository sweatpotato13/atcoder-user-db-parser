import { Repository, EntityRepository } from "typeorm";
import { User } from "@src/common/entities/user.entity";
import { IUserRepository } from "../interfaces/repository/user-repository.interface";

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository {
    async createUser(data: User): Promise<User> {
        const user = await this.save(
            super.create({
                ...data
            })
        );
        return user;
    }

    async removeUser(data: User): Promise<boolean> {
        try {
            const user = await super.remove(data);
            return true;
        } catch (error: any) {
            return false;
        }
    }

    async findUserById(user: string): Promise<User> {
        const info = await super.findOne({ user: user });
        return info;
    }
}
