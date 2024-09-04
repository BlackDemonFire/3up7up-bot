import { madeMistake, messagePrimes, need3up, need7up, primeFactors, quersumme, } from "./functions.js";
export function check3up7up(message) {
    const game = client.counter.get(message.channel.id);
    if (!game)
        return;
    const last = game.cur;
    const cur = last + 1;
    const three = need3up(cur);
    const hasThree = message.content.toLowerCase().includes("3up");
    let allowthree = false;
    const seven = need7up(cur);
    const hasSeven = message.content.toLowerCase().includes("7up");
    let allowseven = false;
    let mademistake = false;
    let mistake = "";
    switch (three) {
        case "multiple":
            allowthree = true;
            if (!hasThree) {
                mademistake = true;
                mistake += `${cur} ist durch 3 teilbar `;
            }
            break;
        case "both":
            allowthree = true;
            if (hasThree) {
            }
            else {
                mademistake = true;
                mistake += `${cur} ist durch 3 teilbar und enthält eine 3. `;
            }
            break;
        case "digit":
            allowthree = true;
            if (hasThree) {
            }
            else {
                mademistake = true;
                mistake += `${cur} enthält eine 3. `;
            }
            break;
        case "none":
            break;
    }
    switch (seven) {
        case "multiple":
            allowseven = true;
            if (hasSeven) {
            }
            else {
                mademistake = true;
                mistake += `${cur} ist durch 7 teilbar `;
            }
            break;
        case "both":
            allowseven = true;
            if (hasSeven) {
            }
            else {
                mademistake = true;
                mistake += `${cur} ist durch 7 teilbar und enthält eine 7. `;
            }
            break;
        case "digit":
            allowseven = true;
            if (hasSeven) {
            }
            else {
                mademistake = true;
                mistake += `${cur} enthält eine 7. `;
            }
            break;
        case "none":
            break;
    }
    if (hasThree && !allowthree) {
        mademistake = true;
        mistake += "3up ist nicht erlaubt";
    }
    if (hasSeven && !allowseven) {
        mademistake = true;
        mistake += "7up ist nicht erlaubt";
    }
    if (!allowthree)
        if (!allowseven)
            if (!message.content.includes(`${cur}`)) {
                mistake += `Die richtige Zahl wäre ${cur} gewesen.`;
                mademistake = true;
            }
    if (mademistake)
        return madeMistake(client, message, mistake);
    client.counter.inc(message.channel.id, "cur");
    message.react("✅");
}
export function check3up7upq(message) {
    const game = client.counter.get(message.channel.id);
    if (!game)
        return;
    const last = game.cur;
    const cur = last + 1;
    const three = need3up(cur);
    const hasThree = message.content.toLowerCase().includes("3up");
    const seven = need7up(cur);
    const hasSeven = message.content.toLowerCase().includes("7up");
    const qthree = need3up(quersumme(cur));
    const qseven = need7up(quersumme(cur));
    let allowthree = false;
    let allowseven = false;
    let mademistake = false;
    let mistake = "";
    switch (three) {
        case "multiple":
            allowthree = true;
            if (hasThree) {
            }
            else {
                mademistake = true;
                mistake += `${cur} ist durch 3 teilbar `;
                allowthree = true;
            }
            break;
        case "both":
            allowthree = true;
            if (hasThree) {
            }
            else {
                mademistake = true;
                mistake += `${cur} ist durch 3 teilbar und enthält eine 3. `;
                allowthree = true;
            }
            break;
        case "digit":
            allowthree = true;
            if (hasThree) {
            }
            else {
                mademistake = true;
                mistake += `${cur} enthält eine 3. `;
                allowthree = true;
            }
            break;
        case "none":
            break;
    }
    switch (seven) {
        case "multiple":
            allowseven = true;
            if (hasSeven) {
            }
            else {
                mademistake = true;
                mistake += `${cur} ist durch 7 teilbar `;
            }
            break;
        case "both":
            allowseven = true;
            if (hasSeven) {
            }
            else {
                mademistake = true;
                mistake += `${cur} ist durch 7 teilbar und enthält eine 7. `;
            }
            break;
        case "digit":
            allowseven = true;
            if (hasSeven) {
            }
            else {
                mademistake = true;
                mistake += `${cur} enthält eine 7. `;
            }
            break;
        case "none":
            break;
    }
    switch (qthree) {
        case "both":
        case "digit":
            allowthree = true;
            if (hasThree) {
            }
            else {
                mademistake = true;
                mistake += `die Quersumme von ${cur} (${quersumme(cur)}) enthält eine 3. `;
            }
            break;
        case "none":
            break;
    }
    switch (qseven) {
        case "multiple":
            allowseven = true;
            if (hasSeven) {
            }
            else {
                mademistake = true;
                mistake += `Die Quersumme von ${cur} (${quersumme(cur)}) ist durch 7 teilbar `;
            }
            break;
        case "both":
            allowseven = true;
            if (hasSeven) {
            }
            else {
                mademistake = true;
                mistake += `Die Quersumme von ${cur} (${quersumme(cur)}) ist durch 7 teilbar und enthält eine 7. `;
            }
            break;
        case "digit":
            allowseven = true;
            if (hasSeven) {
            }
            else {
                mademistake = true;
                mistake += `Die Quersumme von ${cur} (${quersumme(cur)}) enthält eine 7. `;
            }
            break;
        case "none":
            break;
    }
    if (hasSeven && !allowseven) {
        mademistake = true;
        mistake += "7up ist nicht erlaubt";
    }
    if (hasThree && !allowthree) {
        mademistake = true;
        mistake += "3up ist nicht erlaubt";
    }
    if (!allowthree)
        if (!allowseven)
            if (!message.content.includes(`${cur}`)) {
                mistake += `Die richtige Zahl wäre ${cur} gewesen.`;
                mademistake = true;
            }
    if (mademistake)
        return madeMistake(client, message, mistake);
    client.counter.inc(message.channel.id, "cur");
    message.react("✅");
}
function primesMismatch(given, necessary) {
    if (given.length !== necessary.length)
        return true;
    for (let i = 0; i < given.length; i++) {
        if (given[i] !== necessary[i])
            return true;
    }
    return false;
}
function primesMismatchReason(given, necessary) {
    let reason = "";
    for (let i = 0; i < given.length; i++) {
        if (given[i] !== necessary[i]) {
            reason += `Die ${i + 1}. Zahl von ${given} entspricht nicht der ${i + 1}. Zahl von ${necessary}. `;
        }
    }
    return reason;
}
export function checkprime(message) {
    const game = client.counter.get(message.channel.id);
    if (!game)
        return;
    const last = game.cur;
    const cur = last + 1;
    const given = messagePrimes(message.content);
    const necessary = primeFactors(cur);
    if (primesMismatch(given, necessary))
        return madeMistake(client, message, primesMismatchReason(given, necessary));
    message.react("✅");
    client.counter.inc(message.channel.id, "cur");
}
//# sourceMappingURL=games.js.map