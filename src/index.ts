import * as dotenv from "dotenv";
dotenv.config();
import { Bot } from "./Bot";

const bot = new Bot({ token: process.env.BOT_TOKEN, prefix: "!" });

bot.on("ready", () => {
    console.log(`${bot.client.user.username} is now online and can be activated with the prefix: ${bot.prefix}`);
});