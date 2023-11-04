import { Event } from "../interfaces/event";
import { Colors, EmbedBuilder } from "discord.js";
import axios from "axios";
interface PrayAndPiC {
  pray: { ar: string; en: string };
  picture: string;
}
async function getPrayAndPicture(): Promise<PrayAndPiC | null> {
  let response = await axios
    .get("http://127.0.0.1:3000/api/pray")
    .catch((err) => null);
  if (!response) return null;
  return response.data as PrayAndPiC;
}

let event: Event = {
  name: "pray",
  subEvent: true,
  run: async (client) => {
    let prayAndPicture = await getPrayAndPicture();
    if (!prayAndPicture) return;
    let embed = new EmbedBuilder()
      .setTitle("**Pray For Palestine**")
      .setImage(prayAndPicture.picture)
      .setColor(Colors.Green);
    for (let guildSettings of client.cache.filter((c) => c.enabled.pray)) {
      let guild = client.guilds.cache.get(guildSettings._id);
      if (!guild) continue;
      let prayChannel = guild.channels.cache.get(
        guildSettings.settings.prayChannel
      );
      embed.setDescription(
        `**${prayAndPicture.pray[guildSettings.settings.language]}**`
      );
      if (!prayChannel || prayChannel.type) continue;
      await prayChannel.send({ embeds: [embed] });
    }
  },
};

export default event;
export { event };
