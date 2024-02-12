'use strict';
//Asigning necessary dom elements;
const inputBtns = document.querySelectorAll('.bx__input');
const container = document.querySelector('.container');
const buttonContainer = document.querySelector('.player__options');
const overlay = document.querySelector('.first__bg');
const multi = document.querySelector('.multi');
const single = document.querySelector('.single');
const back = document.querySelector('.back');
const music = document.querySelector('.music');
const optionDisplay = document.querySelector('.player__options');
const pauseBtn = document.querySelector('.pause__btn');
const main = document.querySelector('.main');
const x = document.querySelector('.player__1');
const o = document.querySelector('.player__2');
const h1 = document.querySelector('h1');
const names = document.querySelectorAll('.name__input');


//Asigning impo global variables and functions

let player='x';
let computer='o';
let isMulti;//to allow single/multiPlayer toggling
let selectedBtns = [];//to avoid populating a btn that's already populated
let selectCount = 0;//to help ease the checking process cause a win can only occur after a certain selection of buttons 
let isOver = false;//guard because no need to do certain things if the game has already finished i.e if we already have a winner;
let computerHasSelected = true;//helps prevent the player from selecting again before a computer does

//contorl buttons

//main menu
setTimeout(function () {
  optionDisplay.style.opacity='1';
}, 2100);

//listing to events on the main menu by event delegation
buttonContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('play')) {
    main.classList.remove('hidden');
    overlay.classList.add('hidden');  
  }
  else if (e.target.classList.contains('option')) {
    document.querySelector('.options').classList.add('hidden');
    document.querySelector('.options__detail').classList.remove('hidden'); 
    optionDisplay.querySelector('h1').style.marginTop = '30px';
  }
})

//User option to single/Multiplayer

const multiToggle = function () {
  isMulti = this.isMulti;
  this.currState.firstElementChild.className = 'fa-solid fa-check';
  this.currState.firstElementChild.style.padding = '0 5px';
  this.prevState.firstElementChild.className = '';
  this.prevState.firstElementChild.style.padding = '0 10px';
  if (isMulti) {
    document.querySelector(`.player__2`).previousElementSibling.className = 'fa-solid fa-user';
    names.forEach(name => name.classList.remove('hidden'));
  }
  else {
    document.querySelector(`.player__2`).previousElementSibling.className = 'fa-solid fa-computer';
    x.removeAttribute('data-name');
    o.removeAttribute('data-name');
    names.forEach(name => {
      name.classList.add('hidden');
      name.firstElementChild.value = '';
    });  
  }
}

single.addEventListener('click', multiToggle.bind({
  currState: single,
  prevState: multi,
  isMulti: false
}));
multi.addEventListener('click', multiToggle.bind({
  currState: multi,
  prevState: single,
  isMulti: true
}));

  
  
//btn to main menu
back.addEventListener('click', () => {
  document.querySelector('.options').classList.remove('hidden');
  document.querySelector('.options__detail').classList.add('hidden');
  optionDisplay.querySelector('h1').style.marginTop = '';
  if (isMulti) {
    names.forEach((name, i) => {
      i === 0 ? x.setAttribute('data-name', name.firstElementChild.value) : o.setAttribute('data-name', name.firstElementChild.value);
    });
  }
});

//music on/off
music.addEventListener('click', () => {
  if (music.firstElementChild.classList.contains('fa-solid')) {
    music.firstElementChild.className=''
    document.getElementById('music').pause();
  }
  else {
    music.firstElementChild.className = 'fa-solid fa-check';
    document.getElementById('music').play();
  }
});

//pausing the game
pauseBtn.addEventListener('click', function () {
  const html =
    `<div class="player__options" style="opacity:1;">
      <div class="options__container">
        <h1>X<span>O</span></h1>
        <div class="options">
          <button id="resume">Resume</button>
          <button class="rematch">Rematch</button>
          <button class="quit">Quit</button>
        </div>
      </div>
    </div`;
  main.insertAdjacentHTML('afterend', html);
})
//listining to in between game menu btns and after game end btns
document.addEventListener('click', function (e) {
  if (e.target.id === 'resume')
    e.target.closest('.player__options').remove();
  else if (e.target.classList.contains('quit')) {
    e.target.closest('.player__options').remove();
    main.classList.add('hidden');
    overlay.classList.remove('hidden');
    x.textContent = '';
    o.textContent = '';
    reset();
  }
  else if (e.target.classList.contains('rematch')) {
    e.target.closest('.player__options').remove();
    x.textContent = '';
    o.textContent = '';
    reset();
  }
    //btns after a winner display
  else if (e.target.classList.contains('fa-rotate-right')) {
    e.target.closest('.winner__display').remove();
    x.textContent = '';
    o.textContent = '';
    reset();
  }
  else if (e.target.classList.contains('fa-list')) {
    e.target.closest('.winner__display').remove();
    main.classList.add('hidden');
    overlay.classList.remove('hidden');
    x.textContent = '';
    o.textContent = '';
    reset();
  }
})

//reset every condition to it's starting position if quit/rematch btn is selected

const reset = function (e) {
  inputBtns.forEach(btn => btn.textContent = '');
  h1.style.color = '#ecd5d5';
  h1.textContent = 'Welcome to Tic Tac Toe';
  player = 'x';
  selectedBtns = [];
  selectCount = 0;
  isOver = false;
  computerHasSelected = true;
};


//checking win of different patterns
const checkWin = function () {
  inputBtns.forEach((btn, i) => {
    if (btn.textContent) {
      // Horizontal Win Checking
      if ([1, 4, 7].includes(+btn.id) &&
        btn.textContent === inputBtns[i + 1].textContent &&
        btn.textContent === inputBtns[i + 2].textContent) {
        isOver = true;
        roundWinner(btn.textContent);
        if (+x.textContent === 3 || +o.textContent === 3)
          finalWinner(btn.textContent);
        return;
      }
      //Vertical win checking
      else if ([1, 2, 3].includes(+btn.id) &&
        btn.textContent === inputBtns[i + 3].textContent &&
        btn.textContent === inputBtns[i + 6].textContent) {
        isOver = true;
        roundWinner(btn.textContent);
        if (+x.textContent === 3 || +o.textContent === 3)
          finalWinner(btn.textContent);
        return;
      }
      //diagonal win checking
      else if (+btn.id === 1 &&
        btn.textContent === inputBtns[i + 4].textContent &&
        btn.textContent === inputBtns[i + 8].textContent) {
        isOver = true;
        roundWinner(btn.textContent);
        if (+x.textContent === 3 || +o.textContent === 3)
          finalWinner(btn.textContent);
        return;
      }
      else if (+btn.id === 3 &&
        btn.textContent === inputBtns[i + 2].textContent &&
        btn.textContent === inputBtns[i + 4].textContent) {
        isOver = true;
        roundWinner(btn.textContent);
        if (+x.textContent === 3 || +o.textContent === 3)
          finalWinner(btn.textContent);
        return;
      }
    }
  })
   //Draw checking
  if (selectCount === 5 && !isOver && !isMulti) {
    isOver = true;
    roundWinner('draw');
  }
  else if (selectCount === 9 && !isOver && isMulti) {
    isOver = true;
    roundWinner('draw');
  }   
}

//declare final winner 
const finalWinner = function (player) {
  let message;
  let who;
  let score;
  let congra;
  let star='';
  if (isMulti) {
    who = player === 'o' ? o.dataset.name : x.dataset.name;
    message = 'win';
    congra = 'congratulations';
    score = 3;
    star = `<span class="star star__1"></span>
            <span class="star star__2"></span>
            <span class="star star__3"></span>`;    
  } 
  else {
    who = 'you';
    message = player === 'o' ? 'lost' : 'win';
    congra = player === 'o' ? 'bad luck' : 'congratulation';
    score = x.textContent;
    score = score === '' ? 0 : score;
    for (let i = 0; i < +score; i++)
      star += `<span class="star star__1"></span>`;
  }
  const html =
    `<div class="winner__display">
    <div class="message__container">
      <div class="name__wrap"><p class="message__${message}"> ${who} ${message}</p></div>
      ${star}
      <p>${congra}!</p>
      <p>Your Score:</p>
      <span class="score">${score}</span>
      <p class="btn"><i class="fa-solid fa-rotate-right"></i><i class="fa-solid fa-list"></i></p>
    </div>
  </div>
  `
  main.insertAdjacentHTML("beforeend", html);
};

//declare round winner
const roundWinner = function (player) {
  document.querySelector('.restart__count').textContent = 3;
  const restartCount = setInterval(function () {
    document.querySelector('.restart__count').textContent = +document.querySelector('.restart__count').textContent - 1;
  }, 1000);
  
  setTimeout(function () {
    clearInterval(restartCount);
    document.querySelector('.restart__count').textContent = '';
    reset();
  }, 3000)
  if (player === 'o') {
    o.textContent = +o.textContent + 1;
    h1.style.color = '#fbd539';
    if (isMulti)
      h1.textContent = `${o.dataset.name} won this round`;
    else
      h1.textContent = '💻 won this round';
      
  }else if(player==='x') {
    x.textContent = +x.textContent + 1;
    h1.style.color = '#ecd5d5';
    if (isMulti)
      h1.textContent = `${x.dataset.name} won this round`;
    else
      h1.textContent = 'You won this round';
  } else {
    h1.textContent = 'Draw';     
  }
}


//random selection of computer we didn't use any algorithm for choosing the best alternative and therefore computer is basically dumb 🤯
const computerChoice = function () {
  if (isOver) return;//gurad clause cause no need to populate comp choice if the game is over
  let rand;
  do {
    rand = Math.trunc(Math.random() * 9 + 1); 
    if (!selectedBtns.includes(String(rand)))
      break;
  }
  while (true);
  inputBtns.forEach((btn,i) => {
    if (+btn.id === rand) {
      btn.textContent = computer;
      btn.style.color = '#fbd539';
      computerHasSelected = true;
      selectedBtns.push(btn.id);
      if (selectCount > 2)
      checkWin();
    }
  });  
}

//this is where the fun 😃 happens we capture events occuring on every button in the container again by event delegation and do stuff
container.addEventListener('click', function (e) {
  inputBtns.forEach(function (btn, i) {
    if (e.target === btn && !selectedBtns.includes(inputBtns[i].id)) {
      if (isMulti) {
        selectCount++;
        btn.textContent = player;
        player === 'o' ? btn.style.color = '#fbd539' : btn.style.color = '#fff';
        selectedBtns.push(btn.id);
        player === 'x' ? player = 'o' : player = 'x';
        selectCount > 4 ? checkWin() : false;
      }
      else {
        if (computerHasSelected) {
          selectCount++;
          btn.textContent = player;
          player === 'o' ? btn.style.color = '#fbd539' : btn.style.color = '#fff';
          selectedBtns.push(btn.id);
          selectCount > 2 ? checkWin() : false;
          setTimeout(computerChoice, 500);
          computerHasSelected = false;
        }
      }
    }
  })
});
