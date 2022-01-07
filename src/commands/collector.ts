import { ICommand } from 'wokcommands';

export default {
  category: 'Testing',
  description: 'Collect username and password',

  testOnly: true,

  callback: ({ message, channel }) => {
    message.reply('Enter your username');

    const collector = channel.createMessageCollector({
      filter: (m) => m.author.id === message.author.id,
      max: 1,
      time: 1000 * 5,
    });

    collector.on('collect', (collectMessage) => {
      console.log('content', collectMessage.content);
    });

    collector.on('end', (collected) => {
      console.log('collected', collected.size);
    });
  },
} as ICommand;
