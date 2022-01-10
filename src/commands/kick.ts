import { GuildMember } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
  category: 'Moderation',
  description: 'Kick a user',

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
        content: 'Please tag someone to kick',
        ephemereal: true,
      };
    }

    if (!target.kickable) {
      return {
        custom: true,
        content: 'Cannot kick that user',
        ephemereal: true,
      };
    }

    args.shift();
    const reason = args.join(' ');

    target.kick(reason);

    return {
      custom: true,
      content: `You kicked <@${target.id}>`,
      ephemereal: true,
    };
  },
} as ICommand;
