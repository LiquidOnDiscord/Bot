import { Client } from "discord.js";
import { Bot } from "../Bot";

export default interface Event {
    name: string,
    once?: boolean,
    run: (bot: Bot, client: Client, ...args: unknown[]) => Promise<unknown> | void;
}