require('dotenv').config({ path: './config.env' })
const Telegram = require('node-telegram-bot-api')
const bot = new Telegram(process.env.Telegram_Bot_Token, { polling: { interval: 100, autoStart: true } })




bot.onText(/\/start/, async (msg) => {
    // console.log(msg.from)
    // console.log(msg.chat)
    // console.log(msg.date)
    // console.log(msg.text)
    // console.log(msg.entities)


    await bot.sendMessage(msg.chat.id, `سلام ${msg.chat.first_name} به ربات ما خوش آمدی`, {
        reply_markup: {
            keyboard: [
                ['شماره تماس', 'درباره ما'],
                ['ثبت نام', 'لینک من']
            ]
        }
    })


    //? When user click on 'لینک من' bot get ID user
    // Ba ravesh zir mishavad yek robat payam nashenas besazim
    if (await msg.text.split(' ')[1]) {
        let target = await bot.getChat(msg.text.split(' ')[1])
        // bot.sendMessage(target) 
        console.log(target)
    }
})



bot.on('message', (msg) => {
    // bot.sendMessage(msg.chat.id, 'پیام شما دریافت شد')


    if (msg.text === 'Hello' || msg.text === 'hello' || msg.text === 'hi' || msg.text === 'Hi' || msg.text === 'سلام') {
        return bot.sendMessage(msg.chat.id, 'سلام')
    }
    else if (msg.text === 'گل' || msg.text === 'Flower') {
        // Send message
        return bot.sendPhoto(msg.chat.id, "https://m.media-amazon.com/images/I/81nvYjVXwwL._AC_SX466_.jpg")
    }
    else if (msg.photo) {
        return bot.sendPhoto(msg.chat.id, `${msg.photo.find(item => item).file_id}`)
    }



    // Buttons
    switch (msg.text) {
        case 'شماره تماس': {
            bot.sendMessage(msg.chat.id, 'شما روی دکمه شماره تماس کلیک کرده اید')
            break;
        }

        case 'درباره ما': {
            bot.sendMessage(msg.chat.id, 'شما روی دکمه درباره ما کلیک کرده اید')
            break;
        }

        case 'ثبت نام': {
            bot.sendMessage(msg.chat.id, 'شما روی دکمه ثبت نام کلیک کرده اید')
            break;
        }

        case 'لینک من': {
            bot.sendMessage(msg.chat.id, `https://t.me/rezaasadolahi_bot?start=${msg.chat.id}`)
            break;
        }
    }
})








