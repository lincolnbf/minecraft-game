const UIElements = {
  actor: document.querySelector(".actor"),
  zombie: document.querySelector(".zombie"),
  phantom: document.querySelector(".phantom"),
  dragon: document.querySelector(".dragon"),
};

const LogicElements = {
  score: document.querySelector(".score"),
  lifes: document.querySelector(".lifes"),
};

const ZOMBIE_CRASH_VALUE = 100;
const PHANTOM_CRASH_VALUE = 100;
const ACTOR_JUMP_IFRAME = 100;
const MOVEMENT_SPEED = 100;

let lifes = 3;
let score_value = 0;
let gameIsRunning = true;

const jump = () => {
  UIElements.actor.classList.add("jump");

  setTimeout(() => {
    UIElements.actor.classList.remove("jump");
  }, 800);
};

const handleW = () => {
  const actorBottomOffsetPosition = +window
    .getComputedStyle(UIElements.actor)
    .bottom.replace("px", "");
  if (actorBottomOffsetPosition >= 300) return;
  UIElements.actor.style.bottom =
    actorBottomOffsetPosition + MOVEMENT_SPEED + "px";
};

const handleS = () => {
  const actorBottomOffsetPosition = +window
    .getComputedStyle(UIElements.actor)
    .bottom.replace("px", "");
  if (actorBottomOffsetPosition <= 0) return;
  UIElements.actor.style.bottom =
    actorBottomOffsetPosition - MOVEMENT_SPEED + "px";
};

const handleA = () => {
  const leftPosition = +window
    .getComputedStyle(UIElements.actor)
    .left.replace("px", "");
  UIElements.actor.style.left = leftPosition - MOVEMENT_SPEED + "px";
};

const handleD = () => {
  const rightPosition = +window
    .getComputedStyle(UIElements.actor)
    .left.replace("px", "");
  UIElements.actor.style.left = rightPosition + MOVEMENT_SPEED + "px";
};

const updateScore = () => {
  score_value += 1;
  LogicElements.score.innerHTML = score_value;
};

const checkColision = () => {
  // TODO: add colision check!!!
};

const clearAnimations = () => {
  // zombie.style.animation = "none";
  UIElements.zombie.style.display = "none";
  // zombie.style.left = ZOMBIE_CRASH_VALUE + "px";

  // phantom.style.animation = "none";
  UIElements.phantom.style.display = "none";
  // phantom.style.left = ZOMBIE_CRASH_VALUE + "px";

  UIElements.dragon.style.display = "none";

  UIElements.actor.style.animation = "none";
  UIElements.actor.style.left = "0px";
  UIElements.actor.src = "assets/dead.png";
};

const die = () => {
  gameIsRunning = false;
};

const run = setInterval(() => {
  const zombiePosition = UIElements.zombie.offsetLeft;
  const actorBottomOffsetPosition = +window
    .getComputedStyle(UIElements.actor)
    .bottom.replace("px", "");

  updateScore();

  if (
    zombiePosition <= ZOMBIE_CRASH_VALUE &&
    actorBottomOffsetPosition <= ACTOR_JUMP_IFRAME
  ) {
    if (lifes <= 0) {
      die();
      clearAnimations();
      clearInterval(run);
    } else {
      setTimeout(() => {
        UIElements.zombie.style.right = 0;
        lifes >= 0 ? lifes-- : lifes;
        if (lifes === 0) {
          LogicElements.lifes.innerHTML = "VOCE MORREU!";
        } else LogicElements.lifes.innerHTML = lifes;
      }, 200);
    }
  }
}, 400);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && gameIsRunning) {
    jump();
  } else if (e.code === "Space" && !gameIsRunning) {
    location.reload();
  } else if (e.code === "KeyW" && gameIsRunning) {
    handleW();
  } else if (e.code === "KeyS" && gameIsRunning) {
    handleS();
  } else if (e.code === "KeyA" && gameIsRunning) {
    // handleA();
  } else if (e.code === "KeyD" && gameIsRunning) {
    // handleD();
  }
});
