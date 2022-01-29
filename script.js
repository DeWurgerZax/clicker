'use strict';

const heroArms = document.getElementById('hero');
const soundtrack = new Audio();
soundtrack.src = 'sounds/soundtrack.mp3';
soundtrack.volume = 0.5;

let gameStarted = false;

class Observer {
  constructor () {
    this.observers = []
  }

  subscribe (fn) {
    this.observers.push(fn)
  }

  unsubscribe (fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn)
  }

  broadcast (data) {
    this.observers.forEach(subscriber => subscriber(data))
  }
}

class Hero {
  constructor (hp = 300, dmg = 25) {
    this.curHP = hp;
    this.dmg = dmg;
    this.HPbar = document.getElementById('heroHP');
  }

  attack(dmg, mutNum) {
    // enemyDMG0.broadcast(dmg);
    // enemyDMG1.broadcast(dmg);
    // enemyDMG2.broadcast(dmg);
    // enemyDMG3.broadcast(dmg);
    // enemyDMG4.broadcast(dmg);
    obsArray[mutNum].broadcast(dmg);
  }
  takeDmg(dmg) {
    if(gameStarted){
      this.curHP -= dmg;
      this.HPbar.style.width = `${this.curHP}px`;
      document.body.style.boxShadow = 'inset 0px 0px 50px 10px red';
    }
  }
}

const randPos = () => {
  const xPos = Math.ceil(Math.random()*1500);
  const yPos = Math.ceil(Math.random()*610);
  return [xPos, yPos];
}

class Enemy {
  constructor (num, hp, dmg, attSound, damagedSound) {
    this.num = num;
    this.curHP = hp;
    this.dmg = dmg;
    this.alive = true;
    this.att = new Audio();
    this.att.volume = 0.4;
    this.att.src = attSound;
    this.dmgSound = new Audio();
    this.dmgSound.src = damagedSound;
    this.dmgSound.volume = 0.6;
    this.mutant = document.querySelectorAll('.enemy');
    this.mutant[this.num].setAttribute('mutantnum', `${this.num}`);
    this.mutant[this.num].style.transition = '1s';
    this.mutant[this.num].style.transform = `translate(${randPos()[0]}px, ${randPos()[1]}px)`;
  }

  takeDmg(dmg) {
    this.curHP -= dmg;
    if(this.curHP <= 0 && this.mutant[this.num] !== undefined){
      this.dmgSound.play();
      this.curHP = 0;
      this.alive = false;
      obsArray[this.num].unsubscribe(takeDMGArr[this.num]);
      this.mutant[this.num].style.boxShadow = 'inset 10px 10px 100px red';
      setTimeout(() => {
        this.mutant[this.num].remove();
      }, 500);
    }
  }
  attack(dmg){
    setInterval(() => {
      if(this.alive){
        this.att.play();
        heroTakeDMG.broadcast(dmg);
        this.mutant[this.num].style.transform = `translate(${randPos()[0]}px, ${randPos()[1]}px)`;
      }
    }, Math.ceil(Math.random()*(3000 - 1000) + 1000));
  }
}

function createEnemies(num, hp, dmg, attSound, dmgSound){
  const newEnemy = new Enemy(num, hp, dmg, attSound, dmgSound);
  return newEnemy;
}

const enemyDMG0 = new Observer();
const enemyDMG1 = new Observer();
const enemyDMG2 = new Observer();
const enemyDMG3 = new Observer();
const enemyDMG4 = new Observer();

const obsArray = [enemyDMG0, enemyDMG1, enemyDMG2, enemyDMG3, enemyDMG4];

const heroTakeDMG = new Observer();
const hero = new Hero();
const playerTakeDmg = hero.takeDmg.bind(hero);

heroTakeDMG.subscribe(playerTakeDmg);

const enemy0 = createEnemies(0, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3');
const takeDMG0 = enemy0.takeDmg.bind(enemy0);

enemyDMG0.subscribe(takeDMG0);
enemy0.attack(enemy0.dmg);

const enemy1 = createEnemies(1, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3');
const takeDMG1 = enemy1.takeDmg.bind(enemy1);

enemyDMG1.subscribe(takeDMG1);
enemy1.attack(enemy1.dmg);

const enemy2 = createEnemies(2, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3');
const takeDMG2 = enemy2.takeDmg.bind(enemy2);

enemyDMG2.subscribe(takeDMG2);
enemy2.attack(enemy2.dmg);

const enemy3 = createEnemies(3, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3');
const takeDMG3 = enemy3.takeDmg.bind(enemy3);

enemyDMG3.subscribe(takeDMG3);
enemy3.attack(enemy3.dmg);

const enemy4 = createEnemies(4, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3');
const takeDMG4 = enemy4.takeDmg.bind(enemy4);

enemyDMG4.subscribe(takeDMG4);
enemy4.attack(enemy4.dmg);

const takeDMGArr = [takeDMG0, takeDMG1, takeDMG2, takeDMG3, takeDMG4];

const attackEnemy = (event) => {
  const shootSound = new Audio();
  shootSound.src = 'sounds/revolver_sound.mp3';
  shootSound.play();
  if(event.target.classList.contains('enemy')){
    const mutNum = event.target.getAttribute('mutantnum');
    hero.attack(hero.dmg, mutNum);
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
  }, 1500);
  heroArms.style.backgroundImage = ' url(imgs/revolver.png)';
  document.body.style.cursor = 'url(imgs/cursor.png), auto';
  gameStarted = true;
}

window.addEventListener('mousemove', heroMove);

startBtn.addEventListener('click', startGame);
document.body.addEventListener('click', attackEnemy);
