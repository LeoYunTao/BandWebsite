
function secondsToTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);

    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function findSong(songs, songName) {

    let songFound = null;

    songs.forEach(song => {
        if (song.name === songName) {
            songFound = song;
            return;
        }
    });

    return songFound;
}

let songs = info.songs;

let cardElement = null;
let cardSongNameElement;
let cardIconElement;

let playerFooterAudio = document.querySelector("#player-audio");
let playerFooter = document.getElementById("player-footer");
let playerFooterSongName = playerFooter.querySelector("#song-name");
let playerFooterPlayIcon = playerFooter.querySelector("#play-icon");
let currentTime = document.getElementById("current-time");
let timeEnd = document.getElementById("time-end");
let playerSlider = document.getElementById("time-playing");

function footerAudio(element) {
    if (playerFooterAudio.paused) {
        playerFooterAudio.play();
        cardElement.querySelector(".icon").src = "img/icons/pause.svg";
        element.firstElementChild.src = "img/icons/pause.svg";
    }
    else {
        playerFooterAudio.pause();
        cardElement.querySelector(".icon").src = "img/icons/play-arrow.svg";
        element.firstElementChild.src = "img/icons/play-arrow.svg";
    }
}

function playAudio(element) {
    playerFooter.style.display = "block";

    if (element.parentElement.parentElement == cardElement && !playerFooterAudio.paused) {
        cardElement.querySelector(".icon").src = "img/icons/play-arrow.svg";
        playerFooterPlayIcon.src = "img/icons/play-arrow.svg";
        
        playerFooterAudio.pause();
        return;
    }

    if (cardElement != null)
    {
        cardElement.querySelector(".icon").src = "img/icons/play-arrow.svg";
        playerFooterPlayIcon.src = "img/icons/play-arrow.svg";
    }

    cardElement = element.parentElement.parentElement;
    cardSongNameElement = cardElement.querySelector(".song-name");
    cardIconElement = element.firstElementChild;

    let song = findSong(songs, cardSongNameElement.textContent);
    playerFooterAudio.src = song.audioPATH;
    cardIconElement.src = "img/icons/pause.svg";
    playerFooterPlayIcon.src = "img/icons/pause.svg";

    playerFooterAudio.addEventListener("loadeddata", () => {
        playerFooterSongName.textContent = song.name;

        timeEnd.textContent = secondsToTime(playerFooterAudio.duration);
        playerFooterAudio.play();
    });

}

playerFooterAudio.addEventListener("timeupdate", () => {
    currentTime.textContent = secondsToTime(playerFooterAudio.currentTime);
    playerSlider.value = (playerFooterAudio.currentTime / playerFooterAudio.duration) * 100;
});

playerFooterAudio.addEventListener("ended", () => {
    cardElement.querySelector(".icon").src = "img/icons/play-arrow.svg";
    // move to next song
});

playerSlider.addEventListener("change", event => {
    let percentage = event.target.value / 100;
    playerFooterAudio.currentTime = percentage * playerFooterAudio.duration;
    currentTime.textContent = secondsToTime(playerFooterAudio.currentTime);
});

let volume = document.getElementById("volume");
playerFooterAudio.volume = 0.5;

volume.addEventListener("change", event => {
    playerFooterAudio.volume = event.target.value / 100;
});
