const actor = document.querySelector(".actor");
const zombie = document.querySelector(".zombie");
const score = document.querySelector(".score");
const CRASH_VALUE = 100;
const ACTOR_JUMP_IFRAME = 100;

const jump = () => {
  actor.classList.add("jump");

  setTimeout(() => {
    actor.classList.remove("jump");
  }, 1000);
};

let score_value = 0;

const loop = setInterval(() => {
  const zombiePosition = zombie.offsetLeft;
  const actorBottomOffsetPosition = +window
    .getComputedStyle(actor)
    .bottom.replace("px", "");

  score_value += 1;
  score.innerHTML = score_value;

  if (
    zombiePosition <= CRASH_VALUE &&
    actorBottomOffsetPosition <= ACTOR_JUMP_IFRAME
  ) {
    zombie.style.animation = "none";
    zombie.style.left = CRASH_VALUE + "px";

    actor.style.animation = "none";
    actor.style.left = "0px";
    actor.src = "assets/dead.png";

    clearInterval(loop);
  }
}, 100);

document.addEventListener("keydown", jump);
