const screens = [
  ...document.querySelectorAll(".screen")
];

let current = 0;

const hearts = document.getElementById("hearts");
const confetti = document.getElementById("confetti");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

/* ---------------------------
   SCREEN NAVIGATION
---------------------------- */

function showScreen(index) {
  if (index < 0 || index >= screens.length) return;

  screens.forEach((screen, i) => {
    screen.classList.toggle("active", i === index);
  });

  current = index;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  createBurst(10);
}

/* Start */
document.getElementById("startBtn").addEventListener("click", () => {
  showScreen(1);
});

/* Next buttons */
document.querySelectorAll(".next").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(current + 1);
  });
});

/* ---------------------------
   MUSIC
---------------------------- */

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play()
      .then(() => {
        musicBtn.textContent = "🎵 Music: On";
      })
      .catch(() => {
        musicBtn.textContent = "🎵 Add music.mp3";
      });
  } else {
    music.pause();
    musicBtn.textContent = "🎵 Music: Off";
  }
});

/* ---------------------------
   MINI GAME
---------------------------- */

const result = document.getElementById("quizResult");

document.querySelectorAll(".answer").forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("correct")) {
      result.textContent = "Correct! 😌 Of course it's Nidu! 💖";
      createBurst(25);
    } else {
      result.textContent = "Nope 😂 Try again!";
    }
  });
});

/* ---------------------------
   FINAL QUESTION
---------------------------- */

let selectedAnswer = "";

const questionResult =
  document.getElementById("questionResult");

document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {

    document.querySelectorAll(".choice").forEach(choice => {
      choice.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedAnswer = button.textContent;

    questionResult.textContent =
      "Aww... thank you for choosing that. 🥺💗";

    createBurst(20);
  });
});

document.getElementById("finalRevealBtn").addEventListener("click", () => {
  if (!selectedAnswer) {
    questionResult.textContent =
      "Choose one first... I'm really curious. 👀💗";
    createBurst(8);
    return;
  }

  createConfetti(80);
  createBurst(35);

  setTimeout(() => {
    showScreen(current + 1);
  }, 700);
});

/* ---------------------------
   FINAL CELEBRATION
---------------------------- */

document.getElementById("celebrateBtn").addEventListener("click", () => {

  createConfetti(150);
  createBurst(45);

  const button = document.getElementById("celebrateBtn");

  button.textContent = "Nidu, Keep Smiling! ❤️";

  document.querySelector("#final .huge-heart").textContent = "💖";

  setTimeout(() => {
    document.querySelector("#final .huge-heart").textContent = "❤️";
  }, 2500);
});

/* Restart */
document.getElementById("restartBtn").addEventListener("click", () => {
  selectedAnswer = "";

  document.querySelectorAll(".choice").forEach(choice => {
    choice.classList.remove("selected");
  });

  questionResult.textContent = "";

  showScreen(0);
});

/* ---------------------------
   FLOATING HEARTS
---------------------------- */

function createHeart() {

  const heart = document.createElement("div");

  heart.className = "heart";

  const symbols = [
    "❤️",
    "💗",
    "💖",
    "💕",
    "💓",
    "✨",
    "🌸",
    "🦋"
  ];

  heart.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  heart.style.left =
    Math.random() * 100 + "vw";

  heart.style.fontSize =
    15 + Math.random() * 25 + "px";

  heart.style.animationDuration =
    5 + Math.random() * 7 + "s";

  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), 13000);
}

function createBurst(amount = 10) {

  for (let i = 0; i < amount; i++) {

    setTimeout(
      createHeart,
      i * 80
    );
  }
}

/* ---------------------------
   CONFETTI
---------------------------- */

function createConfetti(amount) {

  const icons = [
    "💖",
    "✨",
    "💕",
    "🌸",
    "⭐",
    "❤️",
    "🎉",
    "🦋"
  ];

  for (let i = 0; i < amount; i++) {

    const piece =
      document.createElement("div");

    piece.className = "confetti";

    piece.textContent =
      icons[
        Math.floor(
          Math.random() * icons.length
        )
      ];

    piece.style.left =
      Math.random() * 100 + "vw";

    piece.style.fontSize =
      10 + Math.random() * 18 + "px";

    piece.style.animationDuration =
      2.5 + Math.random() * 3 + "s";

    piece.style.animationDelay =
      Math.random() * .7 + "s";

    confetti.appendChild(piece);

    setTimeout(
      () => piece.remove(),
      6000
    );
  }
}

/* Continuous hearts */
setInterval(createHeart, 900);

/* Initial effect */
createBurst(10);