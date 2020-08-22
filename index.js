/**
 * @file: index.js
 * @author: Paulo Alves
 * @description: responsável pela integração com a API do Telegram para uso de um chatbot.
 * @version 1.0.0 (22/08/2020)
 */

const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

const token = 'DIGITE AQUI SEU TOKEN!!!';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async function (msg) {
    const chatId = msg.chat.id;
    console.log(msg.text);

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;
    
    if(dfResponse.intent === 'Treino específico'){
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.corpo.stringValue);
    }

    bot.sendMessage(chatId, responseText);
});