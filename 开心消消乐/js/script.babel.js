'use strict';

var cardsArray = [{
  'name': '萌萌',
  'img': 'img/萌萌.jpg'
}, {
  'name': '卖萌',
  'img': 'img/卖萌.jpg'
}, {
  'name': '蚂蚁',
  'img': 'img/蚂蚁.jpg'
}, {
  'name': '设计师',
  'img': 'img/设计师.jpg'
}, {
  'name': '许哥',
  'img': 'img/许哥.jpg'
}, {
  'name': '呓语',
  'img': 'img/呓语.jpg'
}, {
  'name': '鵺鸦',
  'img': 'img/鵺鸦.jpg'
}, {
  'name': '率',
  'img': 'img/率.jpg'
}, {
  'name': '莱恩',
  'img': 'img/莱恩.jpg'
}, {
  'name': '简单',
  'img': 'img/简单.jpg'
}, {
  'name': '吃饱',
  'img': 'img/吃饱.jpg'
}, {
  'name': '8少',
  'img': 'img/8少.jpg'
}];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;


  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
};

var last = function match() {
  var match = document.querySelectorAll('.match');
  if(match.length == cardsArray.length * 2){
      // window.open("./firework/guessNumber.html");
      window.location.href = "./firework/guessNumber.html";
  }
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        setTimeout(last, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});
