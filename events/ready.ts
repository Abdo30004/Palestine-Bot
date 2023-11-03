import { Event } from "../interfaces/event";
import { ChannelType } from "discord.js";
let event: Event = {
  name: "ready",

  run: async (client) => {
    await client.updateCache();
    console.log(`${client.user?.tag} is ready!`);

    setInterval(async () => {
      let newNews = true;
      if (!newNews) return;

      for (let guildSettings of client.cache) {
        let guild = client.guilds.cache.get(guildSettings._id);
        if (!guild) continue;
        let newsChannel = guild.channels.cache.get(
          guildSettings.settings.newsChannel
        );
        if (!newsChannel || newsChannel.type) return;
        await newsChannel.send("New News!");
      }
    }, 5000);
  },
};

export default event;
export { event };
