'use trict';

const youtubedl = require('youtube-dl');
const fs = require('fs');
const path = require('path');

const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch';

const getYoutubeFromVideoID = (videoID) => {
    return `${YOUTUBE_BASE_URL}?v=${videoID}`;
};

const onDowload = (url, dir, onCompleted) => {
    let dowloaded = 0;
    let output = null;
    const video = youtubedl(url, ['--format=18'], {
        start: dowloaded,
        cwd: dir
    });

    video.on('info' , ({size, _filename}) => {
        console.log(`Download ${url} started`);
        console.log('filename: ' + _filename);
        output = path.join(`${dir}/${_filename}`);
        video.pipe(fs.createWriteStream(output));
    });

    video.on('complete', ({_filename}) => {
        console.log('filename: ' + _filename + ' already downloaded.')
    });

    video.on('error', (e) => {
        console.log(e);
        output = null;
    })

    video.on('end', function() {
        console.log('finished downloading!');
        if(output != null) {
            onCompleted(output);
        }
    });
}

module.exports.dowloadAll = (videoIDs, dir, onCompleted) => {
    // const video = youtubedl(getYoutubeFromVideoID)
    videoIDs
        .map(getYoutubeFromVideoID)
        .forEach(url => onDowload(url, dir, onCompleted));
}