import { ICommand } from 'wokcommands';

export default {
  category: 'Testing',
  description: 'Join simulated',

  slash: 'both',
  testOnly: true,

  callback: ({ client, member }) => {
    client.emit('guildMemberAdd', member);

    return 'Join simulated';
  },
} as ICommand;
