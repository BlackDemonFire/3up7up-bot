// a map that contains configuration values parsed from process.env using zod
import { z } from "zod";

const configSchema = z.object({
	DISCORD_TOKEN: z.string(),
	DISCORD_GUILD_ID: z.string(),
	OWNER_ROLE_ID: z.string(),
	MOD_ROLE_ID: z.string(),
});

export const config = configSchema.parse(process.env);
