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
    this.alive = true;
    this.reloading = false;
    this.curHP = hp;
    this.dmg = dmg;
    this.bullets = 15;
    this.rad = 200;
    this.HPbar = document.getElementById('heroHP');
    this.radBar = document.getElementById('radiationBar');
  }
  wasteBullets(){
    this.bullets -= 1;
    if(this.bullets <= 0){
      reloadText.style.opacity = '1';
      this.bullets = 0;
    }
  }
  reload(){
    this.reloading = true;
    heroArms.style.backgroundImage = 'url(imgs/reload.gif)';
    this.bullets = 0;
    setTimeout(() => {
      reloadText.style.opacity = '0';
      this.bullets = 15;
      heroArms.style.backgroundImage = 'url(imgs/static_edit.png)';
      this.reloading = false;
    }, 5400);
  }
  attack(dmg, mutNum) {
    if(this.bullets > 0 && !this.reloading){
      heroArms.style.backgroundImage = 'url(imgs/shoot.gif)';
      setTimeout(() => {
        heroArms.style.backgroundImage = 'url(imgs/static_edit.png)';
      }, 500);
      obsArray[mutNum].broadcast(dmg);
    }
  }
  heal(){
    this.curHP += 100;
    this.HPbar.style.width = `${this.curHP}px`;
    if(this.curHP > 125) {
      document.body.style.boxShadow = 'inset 0px 0px 50px 10px black'
    };
  }
  radiationDMG(){
    setInterval(()=>{
      this.rad -= 5;
      this.radBar.style.width = `${this.rad}px`;
      if(this.rad <= 0 && this.alive === true) {
        this.alive = false;
        this.death();
      }
    }, 200);
  }
  changeFilter(){
    this.rad += 100;
    this.radBar.style.width = `${this.rad}px`;
  }
  takeDmg(dmg) {
   // if(gameStarted){
      this.curHP -= dmg;
      this.HPbar.style.width = `${this.curHP}px`;
      if(this.curHP <= 125 && document.body.style.boxShadow !== 'inset 0px 0px 50px 10px red'){
        document.body.style.boxShadow = 'inset 0px 0px 50px 10px red';
      } 
      if(this.curHP <= 0 && this.alive === true){
        this.curHP = 0;
        this.alive = false;
        this.death();
      };
   // }
  }
  death() {
    const gameOver = document.createElement('div');
    gameOver.classList.add('gameOver');
    gameOver.textContent = 'YOU DEAD';
    gameOver.style.top = 'calc(50% - 50px)';
    document.body.append(gameOver);
    setTimeout(()=>{
      location.reload();
    }, 3000);
  }
}

const randPos = () => {
  let xPos = Math.ceil(Math.random() * (window.innerWidth - 350));
  let yPos = Math.ceil(Math.random() * (window.innerHeight - 350));
  return [xPos, yPos];
}
const createItems = (n,m) => {
  for(let i = 0; i < n; i += 1){
    const bandage = document.createElement('div');
    bandage.classList.add('bandage');
    bandage.style.transform = `translate(${randPos()[0]}px, ${randPos()[1]}px)`;
    document.body.append(bandage);
  }
  for(let i = 0; i < m; i += 1){
    const filter = document.createElement('div');
    filter.classList.add('filter');
    filter.style.transform = `translate(${randPos()[0]}px, ${randPos()[1]}px)`;
    document.body.append(filter);
  }
};
let lvls = 6;
let mutant = document.querySelectorAll('.enemy');
// let lvlCounter = 0;
let deadArray = null;
class Enemy {
  
  constructor (num, hp, dmg, attSound, damagedSound, type) {
    this.create = document.createElement('div');
    this.create.classList.add('enemy');
    this.create.style.backgroundImage = type;
    document.body.append(this.create);
    mutant = document.querySelectorAll('.enemy');
    this.num = num;
    this.curHP = hp;
    this.dmg = dmg;
    this.alive = true;
    this.att = new Audio();
    this.att.volume = 0.3;
    this.att.src = attSound;
    this.dmgSound = new Audio();
    this.dmgSound.src = damagedSound;
    this.dmgSound.volume = 0.5;
    mutant[this.num].setAttribute('mutantnum', `${this.num}`);
    mutant[this.num].style.transition = '1s';
    mutant[this.num].style.transform = `translate(${randPos()[0]}px, ${randPos()[1]}px)`;
  }

  takeDmg(dmg) {
    deadArray = obsArray;
    this.curHP -= dmg;
    if(this.curHP <= 0 && mutant[this.num] !== null){
      this.dmgSound.play();
      this.curHP = 0;
      this.alive = false;
      obsArray[this.num].unsubscribe(takeDMGArr[this.num]);
      mutant[this.num].style.opacity = '0';
      deadArray[this.num] = 'dead';
      setTimeout(() => {
        deadArray = deadArray.filter(deadFilter);
        mutant[this.num].remove();
        if(deadArray.length === 0) {
          lvls -= 1; 
          if(lvls === 5){
            stage2(10, 10);
          } else if(lvls === 4){
            stage3(25, 25);
          } else if(lvls === 3){
            let randomLVL = Math.floor(Math.random() * 2);
            if(randomLVL === 0) {
              stage2(3, 2);
            } else {
              stage3(10, 5);
            }
          } 
          else if(lvls === 2){
            let randomLVL = Math.floor(Math.random() * 2);
            if(randomLVL === 0) {
              stage2(4, 1);
            } else {
              stage3(8, 3);
            }
          } 
          else if(lvls === 1){
            let randomLVL = Math.floor(Math.random() * 2);
            if(randomLVL === 0) {
              stage2(6, 1);
            } else {
              stage3(10, 1);
            }
          } 
          else{
            theEnd();
          }
        }
      }, 500);
    }
  }
  attack(dmg){
    setInterval(() => {
      if(this.alive && gameStarted){
        this.att.play();
        heroTakeDMG.broadcast(dmg);
        mutant[this.num].style.transform = `translate(${randPos()[0]}px, ${randPos()[1]}px)`;
      }
    }, Math.ceil(Math.random()*(3000 - 1000) + 1000));
  }
}
function createEnemies(num, hp, dmg, attSound, dmgSound, type){
  const newEnemy = new Enemy(num, hp, dmg, attSound, dmgSound, type);
  return newEnemy;
}