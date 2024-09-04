import { z } from "zod";
export const gameNameSchema = z.union([
    z.literal("prime"),
    z.literal("3up7up"),
    z.literal("3up7upq"),
]);
//# sourceMappingURL=game.js.map