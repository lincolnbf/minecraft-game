const UIElements = {
  actor: document.querySelector(".actor"),
  zombie: document.querySelector(".zombie"),
  phantom: document.querySelector(".phantom"),
};

const LogicElements = {
  score: document.querySelector(".score"),
};

const ZOMBIE_CRASH_VALUE = 100;
const PHANTOM_CRASH_VALUE = 100;
const ACTOR_JUMP_IFRAME = 100;

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
  UIElements.actor.style.bottom = actorBottomOffsetPosition + 20 + "px";
};

const handleS = () => {
  const actorBottomOffsetPosition = +window
    .getComputedStyle(UIElements.actor)
    .bottom.replace("px", "");
  UIElements.actor.style.bottom = actorBottomOffsetPosition - 20 + "px";
};

const handleA = () => {
  const leftPosition = +window
    .getComputedStyle(UIElements.actor)
    .left.replace("px", "");
  UIElements.actor.style.left = leftPosition - 20 + "px";
};

const handleD = () => {
  const rightPosition = +window
    .getComputedStyle(UIElements.actor)
    .left.replace("px", "");
  UIElements.actor.style.left = rightPosition + 20 + "px";
};

const setRandomTickForPhantomSpeed = () => {
  if (score_value % 10 === 0) {
    const TICK = Math.floor(Math.random() * (3 - 1)) + 1;
    UIElements.phantom.style.animation = `enemy-movement ${TICK}s infinite linear`;
  }
};

const updateScore = () => {
  score_value += 1;
  LogicElements.score.innerHTML = score_value;
  setRandomTickForPhantomSpeed();
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
    die();
    clearAnimations();
    clearInterval(run);
  }
}, 100);

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
    handleA();
  } else if (e.code === "KeyD" && gameIsRunning) {
    handleD();
  }
});
