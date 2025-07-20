const ArrayImg = [
  './images/pinkmeng1.jpg',
  './images/pinkmeng2.jpg',
  './images/pinkmeng3.jpg',
  './images/pinkmeng4.jpg',
  './images/pinkmeng5.jpg',
  './images/pinkmeng6.jpg',
];
const cur = document.querySelector('.scroll_box .cur .img_cur');
const prev = document.querySelector('.scroll_box .prev .img_prev');
const next = document.querySelector('.scroll_box .next .img_next');
const scroll_box = document.querySelector('.scroll_box');
let cur_id = +cur.dataset.id;
let IsTransition = false;

// 创建图片元素
function CreatScroll_Img(cur_id) {
  const prev_id = cur_id === 0 ? ArrayImg.length - 1 : cur_id - 1;
  const next_id = cur_id === ArrayImg.length - 1 ? 0 : cur_id + 1;
  cur.style.background = `url(${ArrayImg[cur_id]}) no-repeat center/cover`;
  prev.style.background = `url(${ArrayImg[prev_id]}) no-repeat center/cover`;
  next.style.background = `url(${ArrayImg[next_id]}) no-repeat center/cover`;
}

// 图片滑动
function scroll_Img(PrevOrNxet, cur) {
  PrevOrNxet.children[0].innerHTML = `
  <div class="text-box">
        <div class="cnt">
          <h2>萌萌写真集</h2>
          <p>
            祝萌萌天天开心，平安喜乐，事业一帆风顺。
          </p>
          <p>
            <a href="#" target="_blank" class="btn">TO <strong>萌萌</strong><em></em></a>
          </p>
        </div>
      </div>
  `;
  PrevOrNxet.style.transition = 'height 1s';
  PrevOrNxet.style.height = '100vh';
  cur.style.transition = 'transform 1s';
  cur.style.transform = PrevOrNxet.dataset.name === "prev" ? `translateY(20%)` : `translateY(-20%)`;
  setTimeout(function () {
    PrevOrNxet.style.transition = 'none';
    cur.style.transition = 'none';
    cur.style.transform = `translateY(0)`;
    cur.style.background = `url(${ArrayImg[cur_id]}) no-repeat center/cover`;
    PrevOrNxet.style.height = '0';
    PrevOrNxet.offsetWidth; //强制渲染
    CreatScroll_Img(cur_id);
    IsTransition = false;
  }, 1000);
}

// 滚动事件
window.addEventListener('wheel', function (e) {
  if (IsTransition === true) return;
  IsTransition = true;
  if (e.deltaY < 0) {
    cur_id--;
    if (cur_id < 0) cur_id = ArrayImg.length - 1;
    scroll_Img(document.querySelector('.scroll_box .prev'), cur);
  }
  if (e.deltaY > 0) {
    cur_id = (cur_id + 1) % ArrayImg.length;
    scroll_Img(document.querySelector('.scroll_box .next'), cur);
  }
});

CreatScroll_Img(cur_id);

