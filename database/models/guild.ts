import { model, Schema } from "mongoose";

interface Guild {
  _id: string;
  settings: {
    newsChannel: string;
    prayChannel: string;
  };
}

const GuildSchema = new Schema<Guild>(
  {
    _id: {
      type: String,
    },
    settings: {
      newsChannel: {
        type: String,
        default: null,
      },
      prayChannel: {
        type: String,
        default: null,
      },
    },
  },
  { _id: false, versionKey: false }
);

let Guild = model<Guild>("Guild", GuildSchema);

export default Guild;
export { Guild };
export type GuildType = Guild;
