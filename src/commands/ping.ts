import { ICommand } from 'wokcommands';

export default {
  category: 'Testing',
  description: 'Replies with Pong',

  slash: 'both',
  testOnly: false,
  guildOnly: false,

  callback: () => {
    return 'Pong';
  },
} as ICommand;
