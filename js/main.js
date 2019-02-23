// TODO: kad nista nije taknuto da se zacrveni i da se poveca miss
// dodati stop

const s = id => document.getElementById(id);

const radioButtons = document.querySelectorAll('input[type="radio"]');
const poljaSlova = document.querySelectorAll('.letters h2');
let numbers = [];
let speed = 3500;
let intervalId;
let randomBroj;
let taknuto = false;

/* FUNKCIJE */

function random() {
  taknuto = false;
  if (numbers.length) {
    const index = Math.floor(Math.random() * numbers.length);
    const izbaceno = numbers.splice(index, 1);
    randomBroj = izbaceno[0];
    document.getElementById('number').innerText = randomBroj;
    s('left').innerText = numbers.length;
  } else {
    clearInterval(intervalId);
    document.getElementById('number').innerText = "Igra je završena";
  }
}

function handleSpeedChange() {
  speed = document.querySelector('input[type="radio"]:checked').value;
}

function init() {

  numbers = [];
  for (let i = 1; i <= 26; i++) {
    numbers.push(i);
  }
  clearInterval(intervalId);
  random();
  intervalId = setInterval(random, speed);
}

/* DOGADJAJI */

for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener('change', handleSpeedChange);
}

document.getElementById('start').addEventListener('click', init);

window.addEventListener('keypress', function(e) {
  if (taknuto) return;

  const slovo = e.key.toUpperCase();
  const karakterBroj = slovo.charCodeAt()

  if (randomBroj + 64 === karakterBroj) {
    poljaSlova[randomBroj-1].style.color = 'green';
    s('hit').innerText = Number(s('hit').innerText) + 1;
  } else {
    poljaSlova[randomBroj-1].style.color = 'red';
    s('miss').innerText = Number(s('miss').innerText) + 1;
  }

  taknuto = true;
})
