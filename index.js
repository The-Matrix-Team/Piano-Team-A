const audio = document.getElementById("audio");
const ply = document.getElementById("play");
const out = document.getElementById("out");

// let tos = 2400;
// var score = 0;
// var round = 0;
// var margin1 = randomMargin(),
//   margin2;

const start = document.querySelector(".start");
const game = document.querySelector("#game");
const score = document.getElementById("score");
const results = document.getElementById("result");
const result_box = document.querySelector(".result_box");
const restart = result_box.querySelector(".restart");
const text = result_box.querySelector(".score_text");
var scoreCount = 0;
var a;
var margin1 = randomMargin(),
  margin2;

var round = 0;
var tos = 2400;
let bool1, bool2, bool3, bool4;
bool1 = bool2 = bool3 = bool4 = true;

function viewResult() {
  game.style.display = "none";
  // results.play();
  result_box.classList.add("activeResult");
  text.innerText = "You've scored " + scoreCount + " points";
}

restart.onclick = () => {
  start.style.display = "block";
  result_box.classList.remove("activeResult");
  score.innerText = 0;
  audio.currentTime = 0;
};

function startAudio() {
  audio.play();
}
audio.addEventListener("ended", () => {
  audio.currentTime = 0;
  // audio.play();
});

function speed(e) {
  a = setInterval(appendDiv, e);
}
function reset() {
  bool1 = bool2 = bool3 = bool4 = true;
}
function outs() {
  audio.pause();
  out.play();
  setTimeout(viewResult, 1000);
}

function appendDiv() {
  var ob = document.createElement("div");

  do {
    margin2 = randomMargin();
  } while (margin1 == margin2);
  {
    margin1 = margin2;
  }

  ob.style.marginLeft = margin2 + "%";
  setTimeout(moveDown, 100, ob);
  //keypress events add
  ob.addEventListener("click", () => {
    ob.style.background = "rgba(0,0,0,0.2)";
    updateScore();
  });
  document.addEventListener("keypress", function (e) {
    if (e.key == document.getElementById("line1").innerHTML) updateScore();
    else if (e.key == "s") updateScore();
    else if (e.key == "d") updateScore();
    else if (e.key == "f") updateScore();
  });

  if (scoreCount >= 30 && scoreCount < 70) round = 1;
  else if (scoreCount >= 70 && scoreCount < 120) round = 2;
  else if (scoreCount >= 120 && scoreCount < 180) round = 3;
  else if (scoreCount >= 180) round = 4;
  document.getElementById("tiles").prepend(ob);
}

function randomMargin() {
  return 25 * Math.floor(Math.random() * 4);
}

function moveDown(e) {
  e.classList.add("move");

  if (round == 1) {
    e.classList.add("speedX1");
    if (bool1 == true) {
      clearInterval(a);
      speed(300);
      reset();
      bool1 = false;
      tos = 1600;
    }
  } else if (round == 2) {
    e.classList.add("speedX2");
    if (bool2 == true) {
      clearInterval(a);
      speed(250);
      reset();
      bool2 = false;
      tos = 1600;
    }
  } else if (round == 3) {
    e.classList.add("speedX3");
    if (bool3 == true) {
      clearInterval(a);
      speed(200);
      reset();
      bool3 = false;
      tos = 1200;
    }
  } else if (round == 4) {
    e.classList.add("speedX4");
    if (bool4 == true) {
      clearInterval(a);
      speed(160);
      reset();
      bool4 = false;
      tos = 1000;
    }
  }
  setTimeout(removeDiv, tos, e);
}

function updateScore() {
  scoreCount++;
  score.innerText = scoreCount;
}

function removeDiv(e) {
  var bg = e.style.background;
  if (bg == "") {
    clearInterval(a);
    outs();
  }
  e.remove();
}

start.querySelector("button").onclick = () => {
  // ply.play();
  game.style.display = "flex";
  start.style.display = "none";
  scoreCount = 0;
  speed(400);
  // setTimeout(startAudio, 1000);
};

var loader = document.getElementById("loader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});
