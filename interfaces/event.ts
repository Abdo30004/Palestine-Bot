import { Client } from "../Base/client";

import { ClientEvents } from "discord.js";

interface Event {
  name: keyof ClientEvents | "news";
  subEvent?: boolean;
  run: (client: Client, ...args:any[]) => void;
}

export default Event;
export { Event };
