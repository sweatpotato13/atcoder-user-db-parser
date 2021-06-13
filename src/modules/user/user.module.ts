import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "@src/shared/repositories/user.repository";
import { LoggerService } from "@src/shared/services";
import { UserService } from "./app/user.service";
import { CommandHandlers } from "./domain/commands/handlers";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([UserRepository]),
        UserRepository
    ],
    providers: [
        { provide: "UserService", useClass: UserService },
        LoggerService,
        ...CommandHandlers
    ],
    controllers: []
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) { }
}
