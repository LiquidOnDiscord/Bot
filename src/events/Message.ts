import { Client, Message } from "discord.js";
import Command from "../@types/Command";
import { Bot } from "../Bot";

export default {
    name: "message",
    async run(_bot: Bot, client: Client, message: Message): Promise<void>{
        if(!message.content.startsWith(this.prefix) || message.author.bot) return;
        const args: string[] = message.content.slice(this.prefix.length).trim().split(/ +/);
        const command: string = args.shift().toLowerCase();
        
        if(!this.commands.has(command)) return;
        try {
            const cmd: Command = this.commands.get(command);
            cmd.run(client, message, args);
        }catch(err){
            message.channel.send("There was an error executing that command!");
            throw new Error(err);
        }
    }
}