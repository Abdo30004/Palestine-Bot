import { EmbedBuilder, EmbedData, Colors, User } from "discord.js";

class editedEmbedBuilder extends EmbedBuilder {
  constructor(data: EmbedData) {
    super(data);
  }

  public author(user: User) {
    this.setAuthor({
      name: user.username,
      iconURL: user.displayAvatarURL(),
    });

    return this;
  }

  public color(color: keyof typeof Colors) {
    this.setColor(Colors[color]);
    return this;
  }
}

class EmbedMaker {
  public make(options: EmbedData): editedEmbedBuilder {
    return new editedEmbedBuilder(options);
  }

  public error(message: string): editedEmbedBuilder {
    return new editedEmbedBuilder({
      description: message,
      color: Colors.Red,
    });
  }

  public success(message: string): editedEmbedBuilder {
    return new editedEmbedBuilder({
      description: message,
      color: Colors.Green,
    });
  }


  
  
}

export default EmbedMaker;
export { EmbedMaker };
