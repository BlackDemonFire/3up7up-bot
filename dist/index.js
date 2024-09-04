import { IntentsBitField } from "discord.js";
import { createInterface } from "node:readline";
import { Bot } from "./bot.js";
import { config } from "./config.js";
import { setGame, setValue } from "./commands.js";
import { check3up7up, check3up7upq, checkprime } from "./games.js";
const discordClient = new Bot({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
    ],
});
global.client = discordClient;
const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
});
rl.on("line", async (line) => {
    if (line.toLowerCase() !== "stop")
        return;
    console.log("Bot wird gestoppt.");
    await discordClient.counter.close();
    console.log("Datenbank wurde heruntergefahren.");
    process.exit(0);
});
discordClient.on("ready", (c) => {
    console.log(`I am ready as ${c.user.tag}`);
});
discordClient.on("messageCreate", (message) => {
    if (message.author.id === message.client.user.id)
        return;
    if (!message.inGuild())
        return;
    if (message.member &&
        (message.member.roles.cache.has(config.OWNER_ROLE_ID /*owner*/) ||
            message.member.roles.cache.has(config.MOD_ROLE_ID /*bot mod*/)) &&
        message.content.toLowerCase().startsWith("!")) {
        if (message.content.startsWith("!set "))
            return setValue(message);
        if (message.content.startsWith("!setgame"))
            return setGame(message);
    }
    //game check
    if (!discordClient.counter.has(message.channel.id))
        return;
    const game = discordClient.counter.get(message.channel.id, "game");
    switch (game) {
        case "3up7up":
            check3up7up(message);
            break;
        case "3up7upq":
            check3up7upq(message);
            break;
        case "prime":
            checkprime(message);
            break;
        default:
            console.error("Unknown game type:", game);
            break;
    }
});
discordClient.login(config.DISCORD_TOKEN);
//# sourceMappingURL=index.js.map