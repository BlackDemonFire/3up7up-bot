function needNUp(a, n) {
    const isMultipleofN = a % n === 0;
    const containsN = `${a}`.includes(`${n}`);
    if (isMultipleofN && containsN)
        return "both";
    if (isMultipleofN)
        return "multiple";
    if (containsN)
        return "digit";
    return "none";
}
export function need3up(a) {
    return needNUp(a, 3);
}
export function need7up(a) {
    return needNUp(a, 7);
}
export function quersumme(a) {
    let cloneOfA = a;
    let sum = 0;
    while (cloneOfA > 0) {
        const c = cloneOfA % 10;
        sum += c;
        cloneOfA = (cloneOfA - c) / 10;
    }
    return sum;
}
export async function madeMistake(client, message, mistake) {
    const game = client.counter.get(message.channel.id);
    if (!game)
        return;
    if (game.game === "3up7upq") {
        const mistakeno = game.mistakes;
        if (mistakeno > 0) {
            client.counter.dec(message.channel.id, "mistakes");
            client.counter.inc(message.channel.id, "cur");
            const emote = client.reactArray[mistakeno];
            if (emote)
                await message.react(emote);
            await message.channel.send(mistake);
        }
        else {
            if (game.cur > game.high) {
                client.counter.set(message.channel.id, game.cur, "high");
                message.pin();
            }
            client.counter.set(message.channel.id, 1, "cur");
            client.counter.set(message.channel.id, 5, "mistake");
            message.react("❌");
            message.channel.send(mistake);
            message.channel.send("1");
        }
    }
    else {
        if (game.cur > game.high) {
            client.counter.set(message.channel.id, game.cur, "high");
            message.pin();
        }
        client.counter.set(message.channel.id, 1, "cur");
        message.react("❌");
        message.channel.send(mistake);
        message.channel.send({ content: "1" });
    }
}
export function primeFactors(n) {
    let cloneOfN = n;
    const factors = [];
    let divisor = 2;
    while (cloneOfN >= 2) {
        if (cloneOfN % divisor === 0) {
            factors.push(divisor);
            cloneOfN = cloneOfN / divisor;
        }
        else {
            divisor++;
        }
    }
    return factors;
}
export function messagePrimes(inputstr) {
    return inputstr
        .split(/^\D*$/)
        .map((str) => Number.parseInt(str))
        .toSorted((a, b) => a - b);
}
//# sourceMappingURL=functions.js.map