import { Client, Collection, Message } from "discord.js";
import BotOptions from "./@types/BotOptions";
import Command from "./@types/Command";
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
    private commands: Collection<string, Command>;

    constructor(options: BotOptions){
        super();
        this.client = new Client();
        this.token = options.token;
        this.prefix = options.prefix;
        this.debug = options.debug || false;
        this.init();
    }

    private init(): void {
        this.client.login(this.token).then(() => {
            this.client.on("ready", () => {
                this.loadCommands();
                this.listener();
                this.emit("ready");
            });
        });
    }

    private listener(): void {
        this.client.on("message", (message: Message) => {
            if(!message.content.startsWith(this.prefix) || message.author.bot) return;

            const args: string[] = message.content.slice(this.prefix.length).trim().split(/ +/);
            const command: string = args.shift().toLowerCase();
            
            if(!this.commands.has(command)) return;

            try {
                const cmd: Command = this.commands.get(command);
                cmd.run(this.client, message, args);
            }catch(err){
                message.channel.send("There was an error executing that command!");
                throw new Error(err);
            }
        });
    }

    private loadCommands(): void {
        this.commands = new Collection();
        const files = readdirSync(`${__dirname}/commands`).filter(f => f.endsWith(".ts"));

        for(const file of files){
            const cmd: Command = require(`${__dirname}/commands/${file}`).default;
            this.commands.set(cmd.name, cmd);
        }
    }
}