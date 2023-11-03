import { GatewayIntentBits, Partials } from "discord.js";
import { Client } from "./Base/client";

import { TLClient } from "./Base/telegram";

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

/*
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
*/

async function main() {
  let options = {
    apiHash: `${process.env.telegramHash}`,
    apiId: parseInt(`${process.env.telegramId}`),
    phoneNumber: `${process.env.telegramPhone}`,
    session: `${process.env.telegramSession}`,
  };
 
  let client = new TLClient(options);

  await client.init();

   let me = await client.getMe();
  if ("username" in me) console.log(`Telegram client ${me.username} is ready!`);

  let messages = await client.getMessages("qassambrigades", {
    limit: 10,
  });
  console.log(messages.map((m) => m.message)[0]);
}

main();

process.on("unhandledRejection", (err) => {
  console.log(err);
});

process.on("uncaughtExceptionMonitor", (err) => {
  console.log(err);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
});
