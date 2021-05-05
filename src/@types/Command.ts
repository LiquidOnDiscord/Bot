import { Client, Message } from "discord.js";

export default interface Command {
    name: string,
    description: string,
    run: (client: Client, message: Message, args: string[]) => void;
}