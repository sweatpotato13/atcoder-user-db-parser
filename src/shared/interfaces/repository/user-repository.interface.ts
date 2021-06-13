import { User } from "@src/common/entities";

export interface IUserRepository {
    createUser(data: User): Promise<User>;
    removeUser(data: User): Promise<boolean>;
    findUserById(user: string): Promise<User>;
}
