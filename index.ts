import { GatewayIntentBits, Partials } from "discord.js";
import { Client } from "./Base/client";

import { TLClient } from "./Base/telegram";

import { config } from "dotenv";
import { NewMessageEvent } from "telegram/events";

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
  telegram: {
    apiHash: `${process.env.telegramHash}`,
    apiId: parseInt(`${process.env.telegramId}`),
    phoneNumber: `${process.env.telegramPhone}`,
    session: `${process.env.telegramSession}`,
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
