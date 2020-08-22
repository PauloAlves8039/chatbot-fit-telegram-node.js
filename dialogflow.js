/**
 * @file: dialogflow.js
 * @author: Paulo Alves
 * @description: responsável pela integração com a API do Dialogflow - https://dialogflow.cloud.google.com/.
 * @version 1.0.0 (22/08/2020)
 */

const dialogflow = require('dialogflow');
const configs = require('./dio-bot-fit.json');

const sessionsClient = new dialogflow.SessionsClient({
    projectId: configs.project_id,
    credentials: {
        private_key: configs.private_key,
        client_email: configs.client_email
    }
});

/**
 * Responsável por gerar mensagens do Dialogflow.
 * 
 * @function sendMessage
 * 
 * @param  chatId identifica o id do chatbot.
 * @param  message representa o corpo da mensagem.
 */
async function sendMessage(chatId, message){
    
    const sessionPath = sessionsClient.sessionPath(configs.project_id, chatId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'pt-br'
            }
        }
    }

    const responses = await sessionsClient.detectIntent(request);
    const result = responses[0].queryResult;
    return {
        text: result.fulfillmentText,
        intent: result.intent.displayName, 
        fields: result.parameters.fields
    };
};

module.exports.sendMessage = sendMessage;