/**
 * @file: youtube.js
 * @author: Paulo Alves
 * @description: responsável pelas configurações de pesquisa de vídeos no youtube.
 * @version 1.0.0 (22/08/2020)
 */

const Youtube = require('youtube-node');
const config = require('./yt-config.json');

const youtube = new Youtube();
youtube.setKey(config.key);

/**
 * Responsável por pesquisar vídeo no youtube.
 * 
 * @function searchVideoURL
 * 
 * @param message parâmetro para exibição de mensagem. 
 * @param queryText parâmetro de pesquisa so vídeo.
 */
function searchVideoURL(message, queryText) {
    return new Promise((resolve, reject) => {
        youtube.search(`Exercício em casa para bíceps ${queryText}`, 2, function (error, result) {
            if (!error) {
                const videoIds = result.items.map((item) => item.id.videoId).filter(item => item);
                const youtubeLinks = videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`);
                resolve(`${message} ${youtubeLinks.join(`, `)}`);
            } else {
                reject('Deu erro!');
            }
        });
    });    
};

module.exports.searchVideoURL = searchVideoURL;

