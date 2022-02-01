'use strict';

const theEnd = () => {
  hero.death = null;
  hero.bullets = 0;
  document.exitFullscreen();
  const deleteALL = document.querySelectorAll('body *');
  for(let i = 0; i < deleteALL.length; i += 1){
    deleteALL[i].remove();
  }
  document.body.style.backgroundImage = 'url(imgs/The-End.jpg)';
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
  document.body.style.justifyContent = 'center';
  document.body.style.alignItems = 'center';
  document.body.style.gap = '10px';
  const gameOver = document.createElement('div');

  gameOver.style.textShadow = '2px -2px 5px red';
  gameOver.style.fontSize = '30px';
  gameOver.style.color = 'black';
  gameOver.textContent = 'Thx for play';
  const playAgain = document.createElement('div');
  playAgain.classList.add('gameOver');
  playAgain.textContent = 'Play Again';
  playAgain.style.cursor = 'pointer';
  playAgain.style.position = 'inherit';
  document.body.append(gameOver);
  document.body.append(playAgain);
  playAgain.onclick = () => {
    location.reload();
  };
}