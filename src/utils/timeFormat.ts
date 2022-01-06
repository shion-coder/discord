const timeFormat = `[${new Date()
  .toLocaleString(process.env.LOCALES || 'vi-VN', { timeZone: process.env.TIMEZONE || 'Asia/Ho_Chi_Minh' })
  .replace(',', ' -')}]`;

export default timeFormat;
