import { Telegraf, Markup } from 'telegraf';

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('Environment variable BOT_TOKEN is required. Use $env:BOT_TOKEN on PowerShell or set it in your environment.');
}

const bot = new Telegraf(token);

const mainMenu = Markup.inlineKeyboard([
  [Markup.button.callback('📱 iPhone', 'MENU_IPHONE'), Markup.button.callback('🤖 Android', 'MENU_ANDROID')],
  [Markup.button.callback('🔌 Подключиться', 'MENU_CONNECT')],
  [Markup.button.callback('👤 Личный кабинет', 'MENU_ACCOUNT'), Markup.button.callback('💳 Оплатить', 'MENU_PAY')],
  [Markup.button.callback('🎁 Пригласи друга', 'MENU_REFERRAL'), Markup.button.callback('🛠 Поддержка', 'MENU_SUPPORT')],
  [Markup.button.callback('ℹ️ О нас', 'MENU_ABOUT')],
  [Markup.button.callback('🎉 Апрельский розыгрыш', 'MENU_PROMO')],
]);

const sendMainMenu = async (ctx: any) => {
  await ctx.reply('Добро пожаловать в Rich Courier VPN! Выберите действие:', mainMenu);
};

bot.start(sendMainMenu);
bot.command('menu', sendMainMenu);
bot.help((ctx) => ctx.reply('Нажмите /start или /menu, чтобы открыть главное меню.'));

bot.action('MENU_CONNECT', async (ctx) => {
  await ctx.answerCbQuery();
  return ctx.reply('Для подключения нажмите ссылку в личном кабинете или напишите в поддержку.');
});

bot.action('MENU_ACCOUNT', async (ctx) => {
  await ctx.answerCbQuery();
  return ctx.reply('Ваш личный кабинет: https://example.com/account');
});

bot.action('MENU_PAY', async (ctx) => {
  await ctx.answerCbQuery();
  return ctx.reply('Оплата услуг: https://example.com/pay');
});

bot.action('MENU_SUPPORT', async (ctx) => {
  await ctx.answerCbQuery();
  return ctx.reply('Поддержка: @Rich_Courier_DzhambekBot. Опишите вашу проблему, и мы поможем.');
});

bot.action('MENU_REFERRAL', async (ctx) => {
  await ctx.answerCbQuery();
  return ctx.reply('Реферальная ссылка: https://example.com/referral');
});

bot.action('MENU_IPHONE', async (ctx) => {
  await ctx.answerCbQuery();
  return ctx.reply('Инструкция для iPhone:\n1. Установите WireGuard или OpenVPN.\n2. Импортируйте конфигурацию.\n3. Включите VPN.');
});

bot.action('MENU_ANDROID', async (ctx) => {
  await ctx.answerCbQuery();
  return ctx.reply('Инструкция для Android:\n1. Установите WireGuard или OpenVPN.\n2. Импортируйте конфигурацию.\n3. Включите VPN.');
});

bot.action('MENU_ABOUT', async (ctx) => {
  await ctx.answerCbQuery();
  return ctx.reply('Rich Courier VPN — быстрый и безопасный VPN для мобильных устройств.');
});

bot.action('MENU_PROMO', async (ctx) => {
  await ctx.answerCbQuery();
  return ctx.reply('Апрельский розыгрыш: выиграйте бесплатную подписку на 1 месяц!');
});

bot.on('message', async (ctx) => {
  await ctx.reply('Нажмите /start, чтобы открыть главное меню Rich Courier VPN.');
});

bot.launch()
  .then(() => console.log('Bot started'))
  .catch((error) => console.error('Bot launch failed:', error));
