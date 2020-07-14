'use trict';

const youtubedl = require('youtube-dl');
const fs = require('fs');
const path = require('path');

const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch';

const getYoutubeFromVideoID = (videoID) => {
    return `${YOUTUBE_BASE_URL}?v=${videoID}`;
};

const onDowload = (url, dir, onCompleted, retry) => {
    let dowloaded = 0;
    let output = null;
    let filename = url;
    let retrys = retry || 5;
    const video = youtubedl(url, ['--format=18'], {
        start: dowloaded,
        cwd: dir
    });

    video.on('info', ({
        size,
        _filename
    }) => {
        console.log(`Download ${url} started`);
        filename = _filename;
        console.log('filename: ' + _filename);
        output = path.join(`${dir}/${_filename}`);
        video.pipe(fs.createWriteStream(output));
    });

    video.on('complete', ({
        _filename
    }) => {
        console.log('filename: ' + _filename + ' already downloaded.')
    });

    video.on('error', (e) => {
        console.log(e.message);
        if (retrys > 0) {
            console.log(`Cannot download ${filename} ! Retrying ${5 - --retrys}`);
            onDowload(url, dir, onCompleted, retrys);
        } else {
            console.log(`Download ${filename} Failed !`);
        }
        output = null;
    })

    video.on('end', function () {
        console.log('finished downloading!');
        if (output != null) {
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