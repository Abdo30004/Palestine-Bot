# Palestine Bot

## About

This is a discord bot project,linked to a web api that scrap data from news websites (Aljazeera en/ar) and also from the official Al-Qassam Brigades Telegram channel and post them in a discord channel (Automatic process).


### How it works

- The bot is connected to a discord client that recieve commands from the users, also it sends messages to a discord channels
- The bot is connected to a telegram client that recieve messages from the official Al-Qassam Brigades Telegram channel and send them to the discord channel (using the discord client);
- The bot get the news from the web api
- The web api scrap the news from the news websites (Aljazeera en/ar) and also using the telegram client to get the news from the official Al-Qassam Brigades Telegram channel

### Commands

- `/setup` : Setup the bot (language,channel,etc..)
- `/news` : Get the latest news from Aljazeera/Al-Qassam Brigades Telegram channel (en/ar)
- `/check-company` : Check if a company is boycotted or not (support israel or not)
- `/ping` : Ping the bot

### Api Short Documentation

- `/api/news?number={news-number}&lang={language}&search=${keywoard?}` : Get the latest news from Aljazeera and Al-Qassam Brigades Telegram channel (en/ar)
- `/api/news/{source}?number={news-number}&lang={language}&search=${keywoard?}` : Get the latest news from a specific source (Aljazeera/Al-Qassam Brigades Telegram channel) (en/ar)
- `/api/check?{company-name}` : Check if a company is boycotted or not (support israel or not)
- `/api/pray` : Return A random pray for palestine quote and a random picture

### Built With

- [Node.js](https://nodejs.org/en/) / [Typescript](https://www.typescriptlang.org/)
- [Discord.js](https://discord.js.org/#/)
- [Express.js](https://expressjs.com/)
- [Cheerio.js](https://cheerio.js.org/)
- [Axios](https://npmjs.com/package/axios)
- [Telegram Client](https://npmjs.com/package/telegram)
- [MongoDB](https://mongodb.com/) / [Mongoose](https://mongoosejs.com/)

### env variables

- `token` : Discord bot token
- `PORT` : Web api port
- `mongodbUri` : MongoDB connection string
- `telegramHash` : Telegram Application hash (for the telegram client)
- `telegramId` : Telegram Application id (for the telegram client)
- `telegramPhone` : Telegram Account phone number (for the telegram client)
- `telegramSession` : Telegram Session string (for the telegram client , to avoid login every time using AuthCode)


## AI Part
Fake News Detection Project with BERT Fine-tuning





