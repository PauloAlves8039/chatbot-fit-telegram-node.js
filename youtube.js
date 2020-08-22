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

youtube.search('Exercício em casa para bíceps', 2, function(error, result){
    if(!error){
        console.log(JSON.stringify(result, null, 2));
    }else {
        console.log('Ocorreu um erro!');
    }
    
});