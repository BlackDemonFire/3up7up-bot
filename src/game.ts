import { z } from "zod";

export interface PrimeGame {
	cur: number;
	high: number;
	game: "prime";
}
export interface ThreeUpSevenupGame {
	cur: number;
	high: number;
	game: "3up7up";
}
export interface ThreeUpSevenupQuersummeGame {
	cur: number;
	high: number;
	game: "3up7upq";
	mistakes: number;
}
export type Game = PrimeGame | ThreeUpSevenupGame | ThreeUpSevenupQuersummeGame;

export const gameNameSchema = z.union([
	z.literal("prime"),
	z.literal("3up7up"),
	z.literal("3up7upq"),
]);
