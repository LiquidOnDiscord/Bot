"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const events_1 = require("events");
class Bot extends events_1.EventEmitter {
    constructor(options) {
        super();
        this.client = new discord_js_1.Client();
        this.token = options.token;
        this.prefix = options.prefix;
        this.debug = options.debug || false;
        this.init();
    }
    init() {
        this.client.login(this.token).then(() => {
            this.client.on("ready", () => {
                this.loadCommands();
                this.listener();
                this.emit("ready");
            });
        });
    }
    listener() {
        this.client.on("message", (message) => {
            if (!message.content.startsWith(this.prefix) || message.author.bot)
                return;
            const args = message.content.slice(this.prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            if (!this.commands.has(command))
                return;
            try {
                const cmd = this.commands.get(command);
                cmd.run(this.client, message, args);
            }
            catch (err) {
                message.channel.send("There was an error executing that command!");
                throw new Error(err);
            }
        });
    }
    loadCommands() {
        this.commands = new discord_js_1.Collection();
        const files = fs_1.readdirSync(`${__dirname}/commands`).filter(f => f.endsWith(".ts"));
        for (const file of files) {
            const cmd = require(`${__dirname}/commands/${file}`);
            this.commands.set(cmd.name, cmd);
        }
    }
}
exports.Bot = Bot;
//# sourceMappingURL=Bot.js.map