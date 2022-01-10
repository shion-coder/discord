// import sgMail from '@sendgrid/mail';
// import addHours from 'date-fns/addHours';
// import { Constants } from 'discord.js';
// import admin from 'firebase-admin';
// import { ICommand } from 'wokcommands';
// export default {
//   category: 'Testing',
//   description: 'Verify email',
//   slash: 'both',
//   testOnly: true,
//   options: [
//     {
//       name: 'code',
//       description: 'The verification code',
//       required: true,
//       type: Constants.ApplicationCommandOptionTypes.NUMBER,
//     },
//   ],
//   callback: async ({ message, interaction, member }) => {
//     const code = message ? +message.content.split(' ')[1] : interaction.options.getNumber('code');
//     const { id } = member.user;
//     console.log('code', code, id);
//   },
// } as ICommand;
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
