import sgMail from '@sendgrid/mail';
import addHours from 'date-fns/addHours';
import { Constants } from 'discord.js';
import admin from 'firebase-admin';
import { ICommand } from 'wokcommands';

export default {
  category: 'Testing',
  description: 'Set email address and get verification code',

  slash: 'both',
  testOnly: true,

  options: [
    {
      name: 'email',
      description: 'The VirtuaBroker email address',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],

  callback: async ({ message, interaction, member }) => {
    const email = message ? message.content.split(' ')[1] : interaction.options.getString('email');

    if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return 'Please enter a valid email address.';
    }

    const checkEmail = await admin.firestore().collection('users').where('email', '==', email).get();
    const checkEmailData = checkEmail.docs.map((doc) => {
      return doc.data();
    });

    if (checkEmailData[0] && checkEmailData[0]?.isVerified === true) {
      return 'This email is already used';
    }

    const { id } = member.user;
    const code = Math.floor(100000 + Math.random() * 900000);

    sgMail.setApiKey(process.env.SENDGRID_KEY as string);

    const msg = {
      to: email,
      from: {
        email: 'info@virtuabroker.com',
        name: 'VirtuaBroker',
      },
      templateId: 'd-fe6475a2baf541b79ef1fe1cd1f924b1',
      dynamic_template_data: {
        code,
      },
    };

    await sgMail.send(msg);

    await admin
      .firestore()
      .collection('users')
      .doc(id)
      .set(
        {
          id,
          email,
          code,
          isVerified: false,
          expires: addHours(new Date(), 24).getTime(),
        },
        { merge: true },
      );

    return `Please check your email \`${email}\` for a 6-digit verification code. Verify using \`!verify <code>\``;
  },
} as ICommand;
