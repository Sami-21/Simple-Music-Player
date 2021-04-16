const music_Container = document.querySelector(".music_container");
const play_btn = document.querySelector("#play");
const prev_btn = document.querySelector("#prev");
const next_btn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progress_Container = document.querySelector(".progress_container");
const cover = document.querySelector("#cover");
const title = document.querySelector("#title");

// songs titles  
const songs = ['Dragonball','Hans_Zimmer_-_Epilogue','TakeFive - Requiem','Woodkid - Run Boy Run'];

//songs track
let songsIndex = 0;

//load songs info in DOM
LoadSong(songs[songsIndex])

//functions
//update song details
function LoadSong(song){
    title.textContent = song
    audio.src = `${song}.mp3`
    cover.src = `${song}.jpg`
}

function PlayMusic(){
music_Container.classList.add("play");
play_btn.querySelector('i.fa').classList.remove('fa-play');
play_btn.querySelector('i.fa').classList.add('fa-pause');

audio.play()
}
function PauseMusic (){
music_Container.classList.remove('play');
play_btn.querySelector('i.fa').classList.remove('fa-pause');
play_btn.querySelector('i.fa').classList.add('fa-play');

audio.pause()
}

function prevSong(){
    songsIndex--;
    if(songsIndex<0){
        songsIndex=songs.length -1;
    }
    LoadSong(songs[songsIndex]);
    PlayMusic();
}

function nextSong(){
    songsIndex++;
    if(songsIndex==songs.length){
        songsIndex=0;
    }
    LoadSong(songs[songsIndex]);
    PlayMusic();
}

function updateProgress(e){
    const {duration,currentTime} = e.srcElement
    const progressPercent = (currentTime / duration)  * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    audio.currentTime = (clickX / width) * audio.duration
}


//Event Listners
play_btn.addEventListener('click',()=>{
    const isPlaying = music_Container.classList.contains('play');
    if(isPlaying){
        PauseMusic();
    }else{
        PlayMusic();
    }
})

//changing songs events
prev_btn.addEventListener('click',prevSong);
next_btn.addEventListener('click',nextSong);

//progress bar 
audio.addEventListener('timeupdate',updateProgress)

//custom progress input
progress_Container.addEventListener('click', setProgress)
audio.addEventListener('ended',nextSong)