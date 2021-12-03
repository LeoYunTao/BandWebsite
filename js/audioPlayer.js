// Mainly about the audio player for the songs

// Convert second to minutes and seconds
function secondsToTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);

    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}


// find song in the songs array and return the song object if found
function findSong(songs, songName) {
    let songIndex = 0;
    let songFound = null;

    songs.forEach(song => {
        if (song.name === songName) {
            songFound = song;
            return;
        }
        songIndex++;
    });

    return [songFound, songIndex];
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

// Playing and updating the audio player and icon
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

// Update the audio player
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

    findSongAndPlay(cardSongNameElement.textContent);

}

// see the time of the song and the slider that corresponds to the time
playerFooterAudio.addEventListener("timeupdate", () => {
    currentTime.textContent = secondsToTime(playerFooterAudio.currentTime);
    playerSlider.value = (playerFooterAudio.currentTime / playerFooterAudio.duration) * 100;
});

// Change to pause icon when the song ends
playerFooterAudio.addEventListener("ended", () => {
    cardElement.querySelector(".icon").src = "img/icons/play-arrow.svg";
    // TODO: move to next song
});

// Change the audio volume
playerSlider.addEventListener("change", event => {
    let percentage = event.target.value / 100;
    playerFooterAudio.currentTime = percentage * playerFooterAudio.duration;
    currentTime.textContent = secondsToTime(playerFooterAudio.currentTime);
});

// Find the song and play it
function findSongAndPlay(songName) {
    let song = findSong(songs, songName)[0];

    playerFooterAudio.src = song.audioPATH;
    cardIconElement.src = "img/icons/pause.svg";
    playerFooterPlayIcon.src = "img/icons/pause.svg";

    playerFooterAudio.addEventListener("loadeddata", () => {
        playerFooterSongName.textContent = song.name;

        timeEnd.textContent = secondsToTime(playerFooterAudio.duration);
        playerFooterAudio.play();
    });
}

let currentSongIndex = null;

// Play next Song
function nextSong() {
    currentSongIndex = currentSongIndex < songs.length-1 ? currentSongIndex+1 : 0;
    findSongAndPlay(songs[currentSongIndex].name);
}

// Play previous Song
function prevSong() {
    currentSongIndex = currentSongIndex > 0 ? currentSongIndex-1 : songs.length-1;
    findSongAndPlay(songs[currentSongIndex].name);
}

let volume = document.getElementById("volume");
playerFooterAudio.volume = 0.5;

volume.addEventListener("change", event => {
    playerFooterAudio.volume = event.target.value / 100;
});
