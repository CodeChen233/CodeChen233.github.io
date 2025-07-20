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

const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
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
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});
