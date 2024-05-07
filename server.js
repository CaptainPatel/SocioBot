import { Telegraf } from "telegraf";
import userModel from "./src/models/User.js";
import connectDb from "./src/config/db.js"
import { message } from "telegraf/filters"
import eventModel from "./src/models/Event.js";
import gemini_run from "./gemini-pro.js";

const bot = new Telegraf(process.env.BOT_TOKEN)


try {
    connectDb();
    console.log("db connected succesfullly");
} catch (error) {
    console.log(error);

    // to ensure bot terminates properly when couldn't connect to DB
    process.kill(process.pid, 'SIGTERM');
}

// ctx = context 
bot.start(async (ctx) => {
    const from = ctx.update.message.from;
    console.log("From : ", from);


    try {
        await userModel.findOneAndUpdate({ tgId: from.id }, {
            $setOnInsert: {
                firstName: from.first_name,
                lastName: from.last_name,
                isBot: from.is_bot,
                username: from.username
            }
        }, { upsert: true, new: true });

        await ctx.reply(`Hello ${from.first_name}, Welcome to captain's bot!!`)
    } catch (error) {
        console.log(error);
        await ctx.reply("facing difficulties!")
    }


});

// to create a command called generate
bot.command('generate', async (ctx) => {

    const from = ctx.update.message.from;

    // reply with sticker
    const { message_id: stickerWaitingId } = await ctx.replyWithSticker(
        "CAACAgIAAxkBAAM4Zjdcb63X925aAAFcN4j0mo2aHT0NAAJ6DQACwJ_wS_593H1ydLDBNQQ"
    );

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);


    // get event from user
    const events = await eventModel.find({
        tgId: from.id,
        createdAt: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    })

    if (events.length === 0) {
        await ctx.deleteMessage(stickerWaitingId);
        await ctx.reply("Aaj Kuch bhi ni kya!");
        return;
    }

    // make open ai api call 

    try {
        const temp = `${events.map((event) => event.text).join(", ")}`
        const result = await gemini_run(temp);

        // delete sticker before sending response
        await ctx.deleteMessage(stickerWaitingId);

        // send response 
        await ctx.reply(result);

    } catch (error) {
        await ctx.reply("Kuch toh gadbad h daya!😐");
        console.log(error.message);
    }

})


bot.on(message('text'), async (ctx) => {
    const from = ctx.update.message.from;

    // get the message
    const message = ctx.update.message.text;

    try {
        // store message with userId
        await eventModel.create({
            text: message,
            tgId: from.id,
        })
        await ctx.reply("Thik hai 👌, To generate the post just enter /generate");
    } catch (error) {
        console.log(error);
        await ctx.reply("ahh, didn't get it. Please try again");
    }
});



bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))