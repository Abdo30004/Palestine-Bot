import * as telegram from "telegram";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { TelegramClientParams } from "telegram/client/telegramBaseClient";
import { LogLevel } from "telegram/extensions/Logger";

interface TLOptions {
  session: string;
  apiId: number;
  apiHash: string;
  phoneNumber: string;
  needAuth?: boolean;
}

class TLClient extends TelegramClient {
  public options: TLOptions;
  public telegram: typeof telegram = telegram;
  constructor(options: TLOptions, params?: TelegramClientParams) {
    super(
      new StringSession(options.session),
      options.apiId,
      options.apiHash,
      params || {}
    );

    super.setLogLevel(LogLevel.NONE);
    this.options = options;
  }
  static async input(text: string): Promise<string> {
    return new Promise((resolve) => {
      process.stdout.write(text);
      process.stdin.once("data", (data) => {
        resolve(data.toString().trim());
      });
    });
  }
  async init() {
    //this.setLogLevel(LogLevel.ERROR);
    await this.connect();
    await this.start({
      phoneNumber: this.options.phoneNumber,
      phoneCode: async () =>
        this.options.needAuth ? await TLClient.input("Enter code: ") : "",
      onError: (err) => console.log(err),
    });
    this.options.needAuth
      ? console.log(
          `You need to store this session key in env: \n${this.session.save()}`
        )
      : null;
  }
}

export default TLClient;
export { TLClient };
export type { TLOptions };
