import { GuildMember } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
  category: 'Moderation',
  description: 'Ban a user',

  permissions: ['ADMINISTRATOR'],

  slash: 'both',
  testOnly: true,
  guildOnly: true,

  minArgs: 2,
  expectedArgs: '<user> <reason>',
  expectedArgsTypes: ['USER', 'STRING'],

  callback: async ({ message, interaction, args }) => {
    const target = message ? message.mentions.members?.first() : (interaction.options.getMember('user') as GuildMember);

    if (!target) {
      return {
        custom: true,
        content: 'Please tag someone to ban',
        ephemereal: true,
      };
    }

    if (!target.bannable) {
      return {
        custom: true,
        content: 'Cannot ban that user',
        ephemereal: true,
      };
    }

    args.shift();
    const reason = args.join(' ');

    target.ban({ reason, days: 7 });

    return {
      custom: true,
      content: `You banned <@${target.id}>`,
      ephemereal: true,
    };
  },
} as ICommand;
