const youtubeDowloader = require('./src/youtube-dowloader');
const mp3Converter = require('./src/mp3.converter');
const fs = require('fs');

require('dotenv').config();

const data = fs.readFileSync(process.env.VIDEO_IDS_INPUT, {encoding: 'UTF-8'});

const videoIDs = data.split(/\r?\n/);
const videoOutput = process.env.VIDEO_OUTPUT;
const audioOutput = process.env.AUDIO_OUTPUT;

youtubeDowloader.dowloadAll(videoIDs,videoOutput , (output) => {
    const dotIndex = output.lastIndexOf('.mp4');
    const slashlastIndex = output.lastIndexOf('\\');
    const filename = output.substring(slashlastIndex + 1, dotIndex);
    mp3Converter.convert(output, `${audioOutput}\\${filename}.mp3`)
});

// 