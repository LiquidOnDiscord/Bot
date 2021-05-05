import { Client, Message } from "discord.js";

export default {
    name: "ping",
    description: "Pong!",
    async run(client: Client, message: Message, args: string[]){
        const msg = await message.channel.send("Pinging..");
        const diff = msg.createdTimestamp - message.createdTimestamp;
        msg.edit(`Pong! 🏓\n${diff}ms`);
    }
}