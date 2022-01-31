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
    this.bullets = 15;
    this.rad = 200;
    this.HPbar = document.getElementById('heroHP');
    this.radBar = document.getElementById('radiationBar');
  }
  wasteBullets(){
    //console.log(this.bullets);
    this.bullets -= 1;
    if(this.bullets <= 0){
      this.bullets = 0;
    }
  }
  reload(){
    heroArms.style.backgroundImage = 'url(imgs/reload5.gif)';
    this.bullets = 0;
    setTimeout(() => {
      this.bullets = 15;
      heroArms.style.backgroundImage = 'url(imgs/static_edit.png)';
    }, 9000);
  }
  attack(dmg, mutNum) {
    
    // enemyDMG0.broadcast(dmg);
    // enemyDMG1.broadcast(dmg);
    // enemyDMG2.broadcast(dmg);
    // enemyDMG3.broadcast(dmg);
    // enemyDMG4.broadcast(dmg);
    if(this.bullets > 0){
      console.log(dmg);
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
      this.rad -= 2;
      this.radBar.style.width = `${this.rad}px`;
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
      if(this.curHP <= 125){
        document.body.style.boxShadow = 'inset 0px 0px 50px 10px red';
      }
   // }
  }
}

const randPos = () => {
  const xPos = Math.ceil(Math.random()*1500);
  const yPos = Math.ceil(Math.random()*610);
  return [xPos, yPos];
}
const createItems = (n) => {
  for(let i = 0; i < n; i += 1){
    const bandage = document.createElement('div');
    bandage.classList.add('bandage');
    const filter = document.createElement('div');
    filter.classList.add('filter');
    document.body.append(bandage);
    document.body.append(filter);
    bandage.style.transform = `translate(${randPos()[0]}px, ${randPos()[1]}px)`;
    filter.style.transform = `translate(${randPos()[0]}px, ${randPos()[1]}px)`;
  }
};
let lvls = 3;
let mutant = document.querySelectorAll('.enemy');
let lvlCounter = 0;
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
    this.dmgSound.volume = 0.4;
    //this.mutant = document.querySelectorAll('.enemy');
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
      mutant[this.num].style.boxShadow = 'inset 10px 10px 100px red';
      deadArray[this.num] = 'dead';
      setTimeout(() => {
        //console.log(obsArray);
        deadArray = deadArray.filter(deadFilter);
        // console.log(obsArray);
        console.log(deadArray);
        mutant[this.num].remove();
        if(deadArray.length === 0) {
          lvls -= 1; 
          if(lvls === 2){
            stage2();
            // enemyDMG0.unsubscribe(takeDMG0);
            // enemyDMG1.unsubscribe(takeDMG1);
            // enemyDMG2.unsubscribe(takeDMG2);
            // enemyDMG3.unsubscribe(takeDMG3);
            // enemyDMG4.unsubscribe(takeDMG4);
          } else if(lvls === 1){
            //console.log('stage3');
            stage3();
          } else if (lvls === 0){
            console.log('game over');
          }
          // let randomLVL = Math.floor(Math.random() * 2);
          // if(lvlCounter < 3){
          //   switch(randomLVL){
          //     case 0 : {
          //       stage2();
          //       lvlCounter += 1;
          //       console.log(lvlCounter);
          //       break;
          //     }
          //     case 1 : {
          //       console.log('stage 3');
          //       lvlCounter += 1;
          //       console.log(lvlCounter);
          //       break;
          //     }
          //   }
          // } else {
          //   console.log('game over');
          //   gameStarted = false;
          // }

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