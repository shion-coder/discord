import { Client, TextChannel } from 'discord.js';
import admin from 'firebase-admin';

export default (client: Client) => {
  client.on('guildMemberAdd', async (member) => {
    const { guild, id } = member;

    member.send(
      `
      Welcome to VirtualBroker Discord Server!
      To access the server please verify yourself using your VirtualBroker email address.
      You can verify your email by replying with \`!iam <email_address>\`.
      You will be emailed a 6-digit verification code and you can let me know by \`!verify <code>\`.
      Hope to see you soon!

      Available commands:
      \`!iam <email_address>\`: request a 6-digit verification code to verify your email address.
      \`!verify <code>\`: verify the code that has been emailed to you.
      \`!whoami\`: check your verified email address.
      `,
    );

    const results = await admin.firestore().collection('messages').doc('welcome').get();
    const resultsData = results.data();

    if (!resultsData) {
      return;
    }

    const { channelId, text } = resultsData;
    const channel = guild.channels.cache.get(channelId) as TextChannel;

    channel.send({
      content: text.replace(/@/g, `<@${id}>`),
    });
  });
};
export const config = {
  displayName: 'Welcome Message',
};
