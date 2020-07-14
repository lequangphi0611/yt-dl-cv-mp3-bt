'use trict';

const os = require('os');
var ffmpeg = require('fluent-ffmpeg');

const MIME_TYPE = 'mp3';

module.exports.convert = (source, output) => {
    const proc = new ffmpeg({
        source,
        nolog: true
    });

    const ffmpegPath = `${__dirname}\\ffmpeg\\bin\\ffmpeg.exe`;
    proc.setFfmpegPath(ffmpegPath);

    proc
        .toFormat(MIME_TYPE)
        .on('end', function () {
            console.log(`${source} has been converted successfully`);
        })
        .on('error', function (err) {
            console.log('An error happened: ' + err.message, output);
            console.log('Cannot convert file ' + source);
        })
        .saveToFile(output);
}