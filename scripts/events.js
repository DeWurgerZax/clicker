'use strict';

const attackEnemy = (event) => {
  const shootSound = new Audio();
  if(!event.target.classList.contains('bandage') && !event.target.classList.contains('filter') && hero.bullets > 0 && gameStarted){
    shootSound.src = 'sounds/revolver_sound.mp3';
    hero.wasteBullets();
    shootSound.play();
  };
  if(event.target.classList.contains('enemy')){
    const mutNum = event.target.getAttribute('mutantnum');
    hero.attack(hero.dmg, mutNum);
  } else if(event.target.classList.contains('bandage')){
    //heroHP.style.width = '300px';
    event.target.remove();
    hero.heal();
  } else if(event.target.classList.contains('filter')){
    //heroHP.style.width = '300px';
    event.target.remove();
    hero.changeFilter();
  }
}

const heroMove = (event) => {
  let coordX = event.x;
  heroArms.style.transform = `translateX(${coordX}px)`;
}

const startGame = () => {
  soundtrack.play();
  startField.style.transform = 'translateY(-1000px)';
  setTimeout(()=>{
    startField.remove();
    hero.radiationDMG();
  }, 1500);
  heroArms.style.backgroundImage = 'url(imgs/static_edit.png)';
  document.body.style.cursor = 'url(imgs/cursor.png), auto';
  createItems(1);
  gameStarted = true;
}

const reloadOnR = (event) => {
  if(event.code === 'KeyR'){
    hero.reload();
  }
}

window.addEventListener('keydown', reloadOnR);
window.addEventListener('mousemove', heroMove);
window.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});
startBtn.addEventListener('click', startGame);
document.body.addEventListener('click', attackEnemy);