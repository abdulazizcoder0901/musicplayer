// Carousels //
let carousel = document.querySelectorAll('.carousel img')

let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active')
    if (carouselImageIndex >= carousel.length - 1) {
        carouselImageIndex = 0
    } else {
        carouselImageIndex++;
    }
    carousel[carouselImageIndex].classList.toggle('active')
}

setInterval(() => {
    changeCarousel()
}, 2500)
// Carousels //

// Navigations//
// Toggling music player
const musicPlayerSection = document.querySelector('.music-player__section')
let openPlayer = document.querySelector('#open-player')

openPlayer.addEventListener('click', () => {
    musicPlayerSection.classList.add('active')
})
// /Navigations//

// Back From Music Player
const backBtnHome = document.querySelector('.music-player__section .back-btn')

backBtnHome.addEventListener('click', () => {
    musicPlayerSection.classList.remove('active')
})
// /Back From Music Player

// Access Playslist//
const playlistSection = document.querySelector('.playlist')
const navBtn = document.querySelector('.music-player__section .nav-btn')

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active')
})
// /Access Playslist//

// Back From Playlists
const backToPlayer = document.querySelector('.playlist .back-btn')
backToPlayer.addEventListener('click', () => {
    playlistSection.classList.remove('active')
})
// /Back From Playlists

// Musics //
let currentMusic = 0
const music = document.querySelector('#audio-source')
const musicSeekBar = document.querySelector('.music-seek__bar')
const songName = document.querySelector('.current-song__name')
const artistName = document.querySelector('.artist-name')
const coverImage = document.querySelector('.cover')
const currentMusicTime = document.querySelector('.current-time')
const musicDuration = document.querySelector('.duration')
// /Musics //

const queue = document.querySelectorAll('.queue')

// Select buttons
const backwardBtn = document.querySelector('i.fa-backward')
const forwardBtn = document.querySelector('i.fa-forward')
const playBtn = document.querySelector('i.fa-play')
const pauseBtn = document.querySelector('i.fa-pause')
const repeatBtn = document.querySelector('span.fa-redo')
const volumeBtn = document.querySelector('span.fa-volume-up')
const volumeSlider = document.querySelector('.volume-slider')
// /Select buttons 

// Play Btn 
playBtn.addEventListener('click', () =>{
    music.play()
    playBtn.classList.remove('active')
    pauseBtn.classList.add('active')
})
// /Play Btn 

// Pause Btn 
pauseBtn.addEventListener('click', () =>{
    music.pause()
    playBtn.classList.add('active')
    pauseBtn.classList.remove('active')
})
// /Pause Btn 

// Setting Musics
const setMusic = (i) =>{
    musicSeekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover; 
    
    setTimeout(() =>{
        musicSeekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration)
    },300)

    currentMusicTime.innerHTML = "00 : 00"

    queue.forEach((item) => item.classList.remove('active'))
    queue[currentMusic].classList.add('active')
}

setMusic(0)
// /Setting Musics

// Format Duration //
const formatTime = (time) =>{
    let min = Math.floor(time / 60) < 10 ? "0" + Math.floor(time / 60) : Math.floor(time / 60)

    let sec = Math.floor(time % 60) < 10 ? "0" + Math.floor(time % 60) : Math.floor(time % 60)

    return `${min} : ${sec}`;
}
// /Format Duration //

// Seekbar Events
setInterval(() =>{
    musicSeekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime)
    if(Math.floor(music.currentTime) == Math.floor(musicSeekBar.max)){
        if(repeatBtn.classList.contains('active')){
            setMusic(currentMusic)
            playBtn.click()
        }else{
            forwardBtn.click()
        }
    }
},500)

musicSeekBar.addEventListener('change', () =>{
    music.currentTime = musicSeekBar.value;
})
// /Seekbar Events

// Forward Btn
forwardBtn.addEventListener('click', () =>{
    if(currentMusic >= songs.length -1){
        currentMusic = 0;
    }else{
        currentMusic++
    }
    setMusic(currentMusic);
    playBtn.click()
})
// /Forward Btn

// Backward Btn
backwardBtn.addEventListener('click', () =>{
    if(currentMusic <= 0){
        currentMusic = songs.length -1;
    }else{
        currentMusic--
    }
    setMusic(currentMusic);
    playBtn.click()
})
// /Backward Btn

// Repeat Btn
repeatBtn.addEventListener('click', () =>{
    repeatBtn.classList.toggle('active')
})
// /Repeat Btn

// Volume Section
volumeBtn.addEventListener('click', () =>{
    volumeBtn.classList.toggle('active')
    volumeSlider.classList.toggle('active')
})

volumeSlider.addEventListener('input', () =>{
    music.volume = volumeSlider.value;
})
// /Volume Section

// Queue Section
queue.forEach((item,i) =>{
    item.addEventListener('click', () =>{
        setMusic(i)
        playBtn.click()
    })
})
// /Queue Section


