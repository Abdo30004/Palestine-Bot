import { Event } from "../interfaces/event";
import { Util } from "../Util/util";



let event: Event = {
    name: "pray",
    subEvent: true,
    run: async (client, message) => {

        for (let guildSettings of client.cache.filter(c => c.enabled.pray)) {
            
        }
    }
}

export default event;
export { event };