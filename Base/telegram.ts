import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { TelegramClientParams } from "telegram/client/telegramBaseClient";
import { LogLevel } from "telegram/extensions/Logger";

interface Options {
  session: string;
  apiId: number;
  apiHash: string;
  phoneNumber: string;
}
class TLClient extends TelegramClient {
  public options: Options;
  constructor(options: Options, params?: TelegramClientParams) {
    super(
      new StringSession(options.session),
      options.apiId,
      options.apiHash,
      params || {}
    );
    this.options = options;
  }

  async init() {
    this.setLogLevel(LogLevel.ERROR);
    await this.connect();
    await this.start({
      phoneNumber: this.options.phoneNumber,
      phoneCode: async () => "",
      onError: (err) => console.log(err),
    });
    
  }
}

export default TLClient;
export { TLClient };
