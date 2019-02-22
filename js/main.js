const radioButtons = document.querySelectorAll('input[type="radio"]');
const numbers = [];
for (let i = 1; i <= 26; i++) {
  numbers.push(i);
}
let speed = 3500;

/* FUNKCIJE */

function random() {
  const index = Math.floor(Math.random() * numbers.length);
  const izbaceno = numbers.splice(index, 1);
  document.getElementById('number').innerText = izbaceno[0];
}

function handleSpeedChange() {
  speed = document.querySelector('input[type="radio"]:checked').value;
}

function init() {
  random();
  setInterval(random, speed);
}

/* DOGADJAJI */

for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener('change', handleSpeedChange);
}

document.getElementById('start').addEventListener('click', init);
