import { GatewayIntentBits, Partials } from "discord.js";
import { Client } from "./Base/client";
import { config } from "dotenv";

config();

let client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
  ],
});


client.start({
  token: `${process.env.token}`,
  mongodbUri: `${process.env.mongodbUri}`,
  eventsDir: "events",
  commandsDir: "commands",
  debug: true,
  api: {
    port: Number(process.env.PORT) || 3000,
  },
});










process.on("unhandledRejection", (err) => {
  console.log(err);
});

process.on("uncaughtExceptionMonitor", (err) => {
  console.log(err);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
});
