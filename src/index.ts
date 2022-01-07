import 'dotenv/config';

import { Client, Intents } from 'discord.js';
import path from 'path';
import WOKCommands from 'wokcommands';

import { Discord } from 'const';
import logger from 'services/logger';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  logger.info('The bot is ready');

  new WOKCommands(client, {
    commandDir: path.join(__dirname, 'commands'),
    typeScript: true,
    testServers: [Discord.GUILD_ID],
    mongoUri: process.env.MONGO_URI,
    dbOptions: {
      keepAlive: true,
    },
  });
});

client.login(process.env.TOKEN);
