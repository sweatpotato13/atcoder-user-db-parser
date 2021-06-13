import { ICommand } from "@nestjs/cqrs";

export class ParseRankingCommand implements ICommand {
    constructor(public readonly data: any) { }
}
