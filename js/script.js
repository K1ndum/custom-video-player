// Получаем объекты

const videoPlayer = document.querySelector('.VideoPlayer');
let video = videoPlayer.querySelector('.video');
const playImg = videoPlayer.querySelector('.play__img');
const player = document.querySelector('.Video__player');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__level');
const togglePlayer = player.querySelector('.player__play');
const prev = player.querySelector('.player__back');
const next = player.querySelector('.player__next');
const playerVolume = player.querySelector('.player__volume');
const playerLevelVolume = player.querySelector('.progress__level');
const zoom = player.querySelector('.player__zoom');
const faster = player.querySelector('.bigger');
const slower = player.querySelector('.smaller');
const speedValue = player.querySelector('.speed_value');
const time = player.querySelector('.time');
const nextVideo = document.querySelector('.next__video');
const prevVideo = document.querySelector('.prev__video');

// переменные

let opacity = 1;
let volumeNow;
let percent;
let check = 0;
let b;
let n;

// Функции

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    if (opacity == 1) {
        playImg.style.opacity = 0;
        opacity = 0;
        togglePlayer.style.cssText = `background-image: url("assets/svg/pause.jpg");`
    } else {
        playImg.style.opacity = 1;
        opacity = 1;
        togglePlayer.style.cssText = '';
    }
    video[method](); 
    playImg.blur();
    togglePlayer.blur();
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }   
  }  

function toggleVolume() {
    if (video.muted === true) {
        video.muted = false;
        playerLevelVolume.value = volumeNow;
        playerVolume.style.cssText = '';

    } else {
        video.muted = true;
        playerLevelVolume.value = 0;
        playerVolume.style.cssText = 'background-image: url("assets/svg/off.jpg");'
    }
    playerLevelVolume.blur();
    playerVolume.blur();
}  

function controlLevelVolume() {
    video.volume = playerLevelVolume.value; 
    volumeNow = video.volume;
    console.log(volumeNow);
    video.muted = false;
    playerVolume.style.cssText = '';
    playerLevelVolume.blur();
    playerVolume.blur();
}

function handleProgress() {
    // Отображение время в инпут
    percent = (video.currentTime / video.duration) * 100;
    progress.value = percent;
    // Текущее время
    let timeVideo = video.currentTime;
    let minutes = Math.floor(timeVideo / 60);
    let seconds = Math.floor(timeVideo - minutes * 60);
    let minutesVal = minutes;
    let secondsVal = seconds;
    if(minutes < 10) {
    minutesVal = '0' + minutes;
    }
    if(seconds < 10) {
    secondsVal = '0' + seconds;
    }

    time.textContent = `${minutesVal}:${secondsVal}`;
}

function rewind(e) {
    let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    progress.blur();
}

function controlSpeed() {
    if ((this.className == 'smaller' && video.playbackRate > 0.6)){
        video.playbackRate -= 0.1;
    } else if ((this.className == 'bigger' && video.playbackRate < 2)){
        video.playbackRate += 0.1;
    }
    speedValue.innerHTML = video.playbackRate.toFixed(1);
}

function switchVideo(event) {
    if (this.className == 'prev__video' || b == true) {
        if (video.paused == false) {
            togglePlay();
        } else {
            video.paused = true;
        }
        video.currentTime = 0;
        videoPlayer.children[check].className = 'offVideo';
        --check;
        if (check == -1) {
            check = 4;
        }
        videoPlayer.children[check].className = 'video';
        video = videoPlayer.querySelector('.video');
        video.addEventListener('timeupdate', handleProgress);
    } else if (this.className == 'next__video' || b == false){
        if (video.paused == false) {
            togglePlay();
        } else {
            video.paused = true;
        }
        video.currentTime = 0;
        videoPlayer.children[check].className = 'offVideo';
        ++check;
        if (check == 5) {
            check = 0;
        }
        videoPlayer.children[check].className = 'video';
        video = videoPlayer.querySelector('.video');
        video.addEventListener('timeupdate', handleProgress);
    }

}

// добовляем события

videoPlayer.addEventListener('click', togglePlay);
togglePlayer.addEventListener('click', togglePlay);
zoom.addEventListener("click", toggleFullScreen);
playerVolume.addEventListener('click', toggleVolume);
playerLevelVolume.addEventListener('click', controlLevelVolume);
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', rewind);
faster.addEventListener('click', controlSpeed);
slower.addEventListener('click', controlSpeed);
prev.addEventListener('click', function () {video.currentTime -= 5; prev.blur()});
next.addEventListener('click', function () {video.currentTime += 5; next.blur()});
nextVideo.addEventListener('click', switchVideo);
prevVideo.addEventListener('click', switchVideo);

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyF') {
        toggleFullScreen();
    } else if (event.code == 'Space') {
        togglePlay();
    } else if (event.code == 'KeyM') {
        toggleVolume();
    } else if (event.code == 'ArrowLeft') {
        video.currentTime -= 5;
    } else if (event.code == 'ArrowRight') {
        video.currentTime += 5;
    } else if (event.code == 'Comma' && video.playbackRate > 0.6){
        video.playbackRate -= 0.1;
        speedValue.innerHTML = video.playbackRate.toFixed(1);
    } else if (event.code == 'Period' && video.playbackRate < 2) {
        video.playbackRate += 0.1;
        speedValue.innerHTML = video.playbackRate.toFixed(1);
    } else if (event.code == 'KeyB') {
        b = true;
        switchVideo();
    } else if (event.code == 'KeyN') {
        b = false;
        switchVideo();
    }
});

console.log('\n 1. Повторить код 10б. \n 2.Обязательный доп функционал 10б \n 3. Видео слайдер 10б. \n Итого 30б. \n Горячие клаыиши: M - off/on звук, Spase - off/on видео, F - полный экран, Стрелки(ArrowLeft и ArrowRight) - Перемотка, < и > - управление скорости, B и N - перелистывать слайдер. Все управление так же возможно очуществить при помощи мыши.');

