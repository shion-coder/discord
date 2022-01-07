import { ButtonInteraction, MessageActionRow, MessageButton } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
  category: 'Testing',
  description: 'Are you sure?',

  slash: true,
  testOnly: true,

  permissions: ['ADMINISTRATOR'],

  callback: async ({ interaction, channel }) => {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton().setCustomId('sure_yes').setLabel('Connfirm').setStyle('SUCCESS').setEmoji('🎉'),
      )
      .addComponents(new MessageButton().setCustomId('sure_no').setLabel('Cancel').setStyle('DANGER'));

    const link = new MessageActionRow().addComponents(
      new MessageButton()
        .setURL('https://docs.wornoffkeys.com/commands/commands')
        .setLabel('Document')
        .setStyle('LINK'),
    );

    await interaction.reply({
      content: 'Are you sure?',
      components: [row, link],
    });

    const collector = channel.createMessageComponentCollector({
      time: 1000 * 10,
    });

    collector.on('collect', (button: ButtonInteraction) => {
      button.reply({
        content: 'You clicked a button',
      });
    });

    collector.on('end', async (collection) => {
      collection.forEach((click) => {
        console.log(click.user.id, click.customId);
      });

      await interaction.editReply({
        content: 'An action has already been taken',
        components: [],
      });
    });
  },
} as ICommand;
