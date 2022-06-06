const actor = document.querySelector(".actor");
const zombie = document.querySelector(".zombie");
const score = document.querySelector(".score");
const CRASH_VALUE = 100;
const ACTOR_JUMP_IFRAME = 100;

let score_value = 0;
let game_is_running = true;

const jump = () => {
  actor.classList.add("jump");

  setTimeout(() => {
    actor.classList.remove("jump");
  }, 1000);
};

const updateScore = () => {
  score_value += 1;
  score.innerHTML = score_value;
};

const clearAnimations = () => {
  zombie.style.animation = "none";
  zombie.style.left = CRASH_VALUE + "px";

  actor.style.animation = "none";
  actor.style.left = "0px";
  actor.src = "assets/dead.png";
};

const die = () => {
  game_is_running = false;
};

const run = setInterval(() => {
  const zombiePosition = zombie.offsetLeft;
  const actorBottomOffsetPosition = +window
    .getComputedStyle(actor)
    .bottom.replace("px", "");

  updateScore();

  if (
    zombiePosition <= CRASH_VALUE &&
    actorBottomOffsetPosition <= ACTOR_JUMP_IFRAME
  ) {
    die();
    clearAnimations();
    clearInterval(run);
  }
}, 100);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && game_is_running) {
    jump();
  } else if (e.code === "Space" && !game_is_running) {
    location.reload();
  }
});
