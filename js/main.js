// TODO: dodati stop
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
  const index = Math.floor(Math.random() * numbers.length);
  const izbaceno = numbers.splice(index, 1);
  s('number').innerText = randomBroj = izbaceno[0]; // precica
  // s('number').innerText = izbaceno[0];
  // randomBroj = izbaceno[0];
}

function gameLoop() {
  if (randomBroj && !taknuto) {
    poljaSlova[randomBroj-1].style.color = 'red';
    s('miss').innerText = Number(s('miss').innerText) + 1;
  }
  if (numbers.length) {
    random();
    s('left').innerText = numbers.length;
  } else {
    clearInterval(intervalId);
    document.getElementById('number').innerText = "Igra je završena";
  }
  taknuto = false;
}

function handleSpeedChange() {
  speed = document.querySelector('input[type="radio"]:checked').value;
}

function init() {
  numbers = [];
  for (let i = 1; i <= 26; i++) {
    numbers.push(i);
    poljaSlova[i-1].style.color = '#bdc5cc'; // setuje default boju
  }
  s('hit').innerText = s('miss').innerText = 0; // precica, videti gore
  s('left').innerText = numbers.length;
  s('number').innerText = "Pripremi se!";
  clearInterval(intervalId);
  intervalId = setInterval(random, speed);
}

function handleUserInput(e) {
  if (taknuto) return;

  const slovo = e.key.toUpperCase();
  const karakterBroj = slovo.charCodeAt();

  if (randomBroj + 64 === karakterBroj) {
    poljaSlova[randomBroj-1].style.color = 'green';
    s('hit').innerText = Number(s('hit').innerText) + 1;
  } else {
    poljaSlova[randomBroj-1].style.color = 'red';
    s('miss').innerText = Number(s('miss').innerText) + 1;
  }

  taknuto = true;
}

/* DOGADJAJI */

for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener('change', handleSpeedChange);
}

document.getElementById('start').addEventListener('click', init);

window.addEventListener('keypress', handleUserInput);
