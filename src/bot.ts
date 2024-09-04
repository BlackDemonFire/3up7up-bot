import { Client } from "discord.js";
import Enmap from "enmap";
import type { Game } from "./game.js";

export class Bot<T extends boolean = true> extends Client<T> {
	counter = new Enmap<string, Game>({ name: "counter",dataDir: "./data" });
	reactArray: string[] = ["", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"] as const;
}
