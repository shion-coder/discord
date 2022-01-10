import 'dotenv/config';

import { Client, Intents } from 'discord.js';
import admin from 'firebase-admin';
import path from 'path';
import WOKCommands from 'wokcommands';

import { Discord } from 'const';
import logger from 'services/logger';

import serviceAccount from './service.json';

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: serviceAccount.private_key,
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
  }),
});

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
});

client.on('ready', () => {
  logger.info('The bot is ready');

  new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    typeScript: true,
    testServers: [Discord.GUILD_ID],
  });
});

client.login(process.env.TOKEN);
