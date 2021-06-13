import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import {
    runOnTransactionCommit,
    runOnTransactionRollback,
    runOnTransactionComplete,
    Transactional
} from "typeorm-transactional-cls-hooked";
import { Cron, CronExpression } from "@nestjs/schedule";
import { IUserService } from "../domain/interfaces/user.interface";
import { ParseRankingCommand } from "../domain/commands/impl/parse-ranking.command";

@Injectable()
export class UserService implements IUserService {
    constructor(private readonly _commandBus: CommandBus) { }

    @Transactional()
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    public async parseRanking(data: any): Promise<any> {
        try {
            const ret = await this._commandBus.execute(
                new ParseRankingCommand(data)
            );
            runOnTransactionCommit(() => { });
            return ret;
        } catch (error) {
            runOnTransactionRollback(() => { });
            throw error;
        } finally {
            runOnTransactionComplete(() => { });
        }
    }

}
