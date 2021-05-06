import { Bot } from "../Bot";

export default {
    name: "ready",
    async run(bot: Bot): Promise<void>{
        bot.loadEvents()
        bot.loadCommands();
        bot.emit("ready");
    }
}