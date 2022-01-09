import { Constants } from 'discord.js';
import admin from 'firebase-admin';
import { ICommand } from 'wokcommands';

export default {
  category: 'Testing',
  description: 'Set welcome channel and message',

  permissions: ['ADMINISTRATOR'],

  slash: true,
  testOnly: true,

  options: [
    {
      name: 'channel',
      description: 'The target channel',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.CHANNEL,
    },
    {
      name: 'text',
      description: 'The welcome message',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],

  callback: async ({ guild, interaction }) => {
    if (!guild) {
      return 'Please tag a text channel';
    }

    const target = interaction.options.getChannel('channel');

    if (!target || target.type !== 'GUILD_TEXT') {
      return 'Please tag a text channel';
    }

    const text = interaction?.options.getString('text');

    await admin.firestore().collection('messages').doc('welcome').set({
      guildId: guild.id,
      channelId: target.id,
      text,
    });

    return 'Set welcome channel and message successfully';
  },
} as ICommand;
