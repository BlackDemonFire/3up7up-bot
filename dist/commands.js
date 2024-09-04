import { gameNameSchema } from "./game.js";
export async function setValue(message) {
    const stringval = message.content.split(" ")[1] ?? "";
    const numval = Number.parseInt(stringval, 10);
    if (Number.isNaN(numval))
        return message.react("❌");
    client.counter.set(message.channel.id, numval, "cur");
    await message.channel.send({ content: `${numval}` });
    await message.react("✅");
}
export function setGame(message) {
    const game = message.content.split(" ")[1];
    if (!game)
        return message.react("❌");
    const gameName = gameNameSchema.safeParse(game);
    if (gameName.success === false)
        return message.react("❌");
    if (gameName.data === "3up7upq") {
        client.counter.set(message.channel.id, {
            cur: 1,
            high: 1,
            game: gameName.data,
            mistakes: 5,
        });
    }
    else {
        client.counter.set(message.channel.id, {
            cur: 1,
            high: 1,
            game: gameName.data,
        });
    }
    message.channel.send("1");
}
//# sourceMappingURL=commands.js.map