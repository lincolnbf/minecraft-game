const actor = document.querySelector(".actor");
const zombie = document.querySelector(".zombie");
const CRASH_VALUE = 100;
const ACTOR_JUMP_IFRAME = 100;

console.log("Actor element: ", actor);

const jump = () => {
  actor.classList.add("jump");

  setTimeout(() => {
    actor.classList.remove("jump");
  }, 1000);
};

const loop = setInterval(() => {
  const zombiePosition = zombie.offsetLeft;
  const actorBottomOffsetPosition = +window
    .getComputedStyle(actor)
    .bottom.replace("px", "");

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
}, 10);

document.addEventListener("keydown", jump);
