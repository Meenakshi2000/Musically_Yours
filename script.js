let currentSong = document.getElementById("play_song");
let playIcon = document.getElementById("play_icon");
let pauseIcon = document.getElementById("pause_icon");
let playpause_icon = document.getElementById("playpause_icon")
let endTime = document.getElementById("end_time");
let currentTime = document.getElementById("start_time");
let currentSeconds = 0;
let currentMinutes = 0;
let endMinutes = 0;
let endSeconds = 0;

let track_name = document.querySelector(".track-name");
let track_movie = document.querySelector(".track-movie");
let timeSlider = document.getElementById("time_slider");
let volumeSlider = document.getElementById("volume_slider");
let nextSongIcon = document.getElementById("next_icon");
let prevSongIcon = document.getElementById("prev_icon");


let isPlaying = false;

let audioInterval;
let activeElement;

function calculateCurrentTime() {
    currentMinutes = Math.floor(currentSong.currentTime / 60);
    currentSeconds = Math.ceil(currentSong.currentTime - (currentMinutes * 60));
    if (currentSeconds === endSeconds && currentMinutes === endMinutes) {
        currentSeconds = 0;
        currentMinutes = 0;
        playpause_icon.innerHTML = '<i class="fa fa-play-circle fa-4x"></i>';


        clearInterval(audioInterval);
    }
    let minutes;
    let seconds;
    if (currentMinutes < 10) {
        minutes = ("0" + currentMinutes);
    } else {
        minutes = currentMinutes;
    }
    if (currentSeconds < 10) {
        seconds = ("0" + currentSeconds);
    } else {
        seconds = currentSeconds;
    }

    let totalTime = minutes + ":" + seconds;
    currentTime.innerText = totalTime;
}

timeSlider.addEventListener("change", () => {
    currentSong.currentTime = timeSlider.value;
    calculateCurrentTime();
});

volumeSlider.addEventListener("change", () => {
    currentSong.volume = (volumeSlider.value / 100);
});
// let volume = document.querySelector("#volume-control");
// volume.addEventListener("change", function(e) {
// audio.volume = e.currentTarget.value / 100;
// })


currentSong.addEventListener("canplaythrough", () => {
    calculateEndTime();
    timeSlider.setAttribute("max", Math.ceil(currentSong.duration));

    playSong();
})

function calculateEndTime() {
    endMinutes = Math.floor(currentSong.duration / 60);
    endSeconds = Math.ceil(currentSong.duration - (endMinutes * 60));
    let minutes;
    let seconds;
    if (endMinutes < 10) {
        minutes = ("0" + endMinutes);
    } else {
        minutes = endMinutes;
    }
    if (endSeconds < 10) {
        seconds = ("0" + endSeconds);
    } else {
        seconds = endSeconds;
    }

    let totalTime = minutes + ":" + seconds;
    endTime.innerText = totalTime;
}

function playpauseTrack() {

    if (!isPlaying) playSong();
    else pauseSong();
}

function playSong() {


    if (activeElement.getAttribute("id") != (songs.length)) {

        playIcon.classList.add("inactive");
        currentSong.play();
        isPlaying = true;
    }

    playpause_icon.innerHTML = '<i class="fa fa-pause-circle fa-4x"></i>';
    audioInterval = setInterval(() => {
        timeSlider.value = currentSong.currentTime;
        calculateCurrentTime();

    }, 1000);

}

function pauseSong() {
    currentSong.pause();
    isPlaying = false;

    playpause_icon.innerHTML = '<i class="fa fa-play-circle fa-4x"></i>';
    clearInterval(audioInterval);
}

function updateSongData() {
    for (let i = 0; i < songs.length; i++) {
        let songsList = document.getElementById("songs-list");
        let prevHtml = songsList.innerHTML;
        let html = `<tr class="song" id="${songs[i].Id}" onClick="UpdateSong(this)">
                        <td>${songs[i].name}</td>
                        <td>${songs[i].movie}</td>
                    </tr>`;
        songsList.innerHTML = prevHtml + html;
    }
}

updateSongData();

function UpdateSong(ele) {

    let songId = ele.getAttribute("id");
    track_name.textContent = songs[songId].name;
    track_movie.textContent = songs[songId].movie;

    currentSong.setAttribute('src', songs[songId].path);
    currentSeconds = 0;
    currentMinutes = 0;
    activeElement = ele;

}

document.getElementById("next_icon").addEventListener("click", playNextSong, false);

function playNextSong() {

    if (activeElement && activeElement.getAttribute("id") != (songs.length-1)) {
        let nextElement = activeElement.nextSibling;
        UpdateSong(nextElement);


    }


}
function PrevSong() {

    if (activeElement && activeElement.getAttribute("id") != 0) {
        let prevElement = activeElement.previousSibling;
        UpdateSong(prevElement);
    }
}
