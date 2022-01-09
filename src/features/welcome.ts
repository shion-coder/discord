import { Client } from 'discord.js';
import admin from 'firebase-admin';

export default (client: Client) => {
  client.on('guildMemberAdd', async (member) => {
    console.log('Test guildMemberAdd');

    const results = await admin.firestore().collection('messages').doc('welcome').get();
    const resultsData = results.data();

    console.log('resultsData', resultsData);
    console.log('member', member);
  });
};
export const config = {
  displayName: 'Welcome Message',
  dbName: 'WELCOME MESSAGE',
};
