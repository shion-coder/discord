import { Constants } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
  category: 'Testing',
  description: 'Adds to number',
  options: [
    {
      name: 'num1',
      description: 'The first number',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.NUMBER,
    },
    {
      name: 'num2',
      description: 'The second number',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.NUMBER,
    },
  ],

  slash: true,
  testOnly: true,

  callback: ({ interaction }) => {
    if (!interaction) {
      return;
    }

    const num1 = interaction.options.getNumber('num1') || 0;
    const num2 = interaction.options.getNumber('num2') || 0;

    interaction.reply({
      content: `The result is ${num1 + num2}`,
      ephemeral: true,
    });
  },
} as ICommand;
