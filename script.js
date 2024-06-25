console.log("Working on our spotify clone");
let currentSong = new Audio();
let songs;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs() {
  let a = await fetch("http://localhost:5500/songs/");
  let response = await a.text();
  console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

const playMusic = (track, pause = false) => {
  currentSong.src = "/songs" + track;
  if (!pause) {
    currentSong.play();
    play.src = "pause.svg";
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {
  songs = await getsongs();
  console.log(songs);
  playMusic(songs[0], true);
  let songUL = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li><img class="invert" width="34" src="music.svg">
                <div class="info">
                  <div>${song.replaceAll("%20", " ")}</div>
                  <div>TANISHKA</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                <img class="invert" src="play.svg">
              </div>
        
        </li>`;
  }

  Array.from(
    document.querySelector(".songlist").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });

  currentSong.addEventListener("timeupdate", () => {
    console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )}/${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });
  document.querySelector("seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
  });

  previous.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index - 1 >= 0) {
      console.log(songs, index);
      playMusic(songs[index + 1]);
    }
  });

  next.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index + 1 < songs.length) {
      console.log(songs, index);
      playMusic(songs[index + 1]);
    }
  });

  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      console.log(e, e.target, e.target.value) / 100;
    });
}
main();

// console.log("Working on our spotify clone");

// let currentSong = new Audio();

// function formatTime(minutes, seconds) {
//   // Ensure both minutes and seconds are two digits long
//   const formattedMinutes = String(minutes).padStart(2, "0");
//   const formattedSeconds = String(seconds).padStart(2, "0");

//   return `${formattedMinutes}:${formattedSeconds}`;
// }

// async function getsongs() {

//   let a = await fetch("http://127.0.0.1:5500/SPOTIFY-CLONE/songs/");
//   let response = await a.text();
//   console.log(response);
//   let div = document.createElement("div");
//   div.innerHTML = response;
//   let as = div.getElementsByTagName("a");
//   let songs = [];
//   for (let index = 0; index < as.length; index++) {
//     const element = as[index];
//     if (element.href.endsWith(".mp3")) {
//       songs.push(element.href.split("/songs/")[1]);
//     }
//   }
//   return songs;
// }

// async function main() {
//   let songs = await getsongs()
//   playMusic(songs[0], true)
//   let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
//   for (const song of songs) {
//     songUL.innerHTML =songUL.innerHTML +`<li><img class="invert" src="music.svg">
//                 <div class="info">
//                   <div>${song.replaceAll("%20", " ")}</div>
//                   <div>TANISHKA</div>
//                 </div>
//                 <div class="playnow">
//                   <span>Play Now</span>
//                 <img class="invert" src="play.svg">
//               </div>

//         </li>`;
//   }

// ==================================
//   var audio =new Audio(songs[0]);
//   audio.addEventListener("loadeddata",() =>{
//     console.log(audio.duration,audio.currentSrc,audio.currentTime)
//   });
// ============================

// const playMusic = (track, pause = false) => {
//   currentSong.src = "/songs/" + track;
//   if(!pause){
//         currentSong.play()
//         play.src = "pause.svg"
//   }
//   document.querySelector(".songinfo").innerHTML = decodeURI(track)
//   document.querySelector(".songtime").innerHTML = 00:00/00:00;
// };

// Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
//     e.addEventListener("click",element => {
//     console.log(e.querySelector(".info").firstElementChild.innerHTML)
//     playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
//   })
//   })

//   play.addEventListener("click",()=>{
//     if(currentSong.paused){
//         currentSong.play()
//         play.src="pause.svg"
//     }
//     else{
//         currentSong.pause()
//         play.src="play.svg"
//     }
//   })
// }

//   currentSong.addEventListener("timeupdate",()=>{
//     console.log(currentSong.currentTime,currentSong.duration);
//     document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
//     document.querySelector("circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%";
//   })

//   document.querySelector("seekbar").addEventListener("click",e=>{
//     let percent =(e.offsetX/e.target.getBoundingClientRect().width)*100;
//     document.querySelector(".circle").style.left=percent+"%";
//     currentSong.currentTime=((currentSong.duration)*percent)/100
//   })

// //   audio.addEventListener("ontimeupdate", () => {
// //     let duration = audio.duration;
// //     console.log(audio.duration, audio.currentSrc, audio.currentTime);
// //   });

// main()
