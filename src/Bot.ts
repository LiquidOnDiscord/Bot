import { Client, Collection } from "discord.js";
import BotOptions from "./@types/BotOptions";
import Command from "./@types/Command";
import Event from "./@types/Event";
import { readdirSync } from "fs";
import { EventEmitter } from "events";

export declare interface Bot {
    on(event: "ready", listener: () => void): this;
}

export class Bot extends EventEmitter {
    readonly client: Client;
    private token: string;
    public debug: boolean;
    public prefix: string;
    public commands: Collection<string, Command>;

    constructor(options: BotOptions){
        super();
        this.client = new Client();
        this.token = options.token;
        this.prefix = options.prefix;
        this.debug = options.debug || false;
        this.init();
    }

    public init(): void {
        this.client.login(this.token);
    }

    public loadEvents(): void {
        const files = readdirSync(`${__dirname}/events`).filter(f => f.endsWith(".ts"));

        for(const file of files){
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const event: Event = require(`${__dirname}/events/${file}`).default;
            if(event.once){
                this.client.once(event.name, (...args) => event.run(this, this.client, ...args));
            }else {
                this.client.on(event.name, (...args) => event.run(this, this.client, ...args));
            }
        }
    }

    public loadCommands(): void {
        this.commands = new Collection();
        const files = readdirSync(`${__dirname}/commands`).filter(f => f.endsWith(".ts"));

        for(const file of files){
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const cmd: Command = require(`${__dirname}/commands/${file}`).default;
            this.commands.set(cmd.name, cmd);
        }
    }
}