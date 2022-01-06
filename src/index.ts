import 'dotenv/config';

import { Client, Intents } from 'discord.js';

import logger from 'services/logger';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  logger.info('The bot is ready');
});

client.login(process.env.TOKEN);
