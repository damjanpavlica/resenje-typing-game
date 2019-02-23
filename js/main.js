const radioButtons = document.querySelectorAll('input[type="radio"]');
let numbers = [];
let speed = 3500;
let intervalId;

/* FUNKCIJE */

function random() {
  if (numbers.length) {
    const index = Math.floor(Math.random() * numbers.length);
    const izbaceno = numbers.splice(index, 1);
    const broj = izbaceno[0];
    document.getElementById('number').innerText = broj;
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
