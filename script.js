'use strict';

const deadFilter = (item, index, array) => {
  if(item === 'dead') {
    item = null;
  }
  return item;
};

let enemyDMG0 = new Observer();
let enemyDMG1 = new Observer();
let enemyDMG2 = new Observer();
let enemyDMG3 = new Observer();
let enemyDMG4 = new Observer();

let obsArray = [enemyDMG0, enemyDMG1, enemyDMG2, enemyDMG3, enemyDMG4];

const heroTakeDMG = new Observer();
const hero = new Hero();
const playerTakeDmg = hero.takeDmg.bind(hero);

heroTakeDMG.subscribe(playerTakeDmg);

const enemy0 = createEnemies(0, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3', 'url(imgs/watchmen_edit.png)');
let takeDMG0 = enemy0.takeDmg.bind(enemy0);

enemyDMG0.subscribe(takeDMG0);
enemy0.attack(enemy0.dmg);

const enemy1 = createEnemies(1, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3', 'url(imgs/watchmen_edit.png)');
let takeDMG1 = enemy1.takeDmg.bind(enemy1);

enemyDMG1.subscribe(takeDMG1);
enemy1.attack(enemy1.dmg);

const enemy2 = createEnemies(2, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3', 'url(imgs/watchmen_edit.png)');
let takeDMG2 = enemy2.takeDmg.bind(enemy2);

enemyDMG2.subscribe(takeDMG2);
enemy2.attack(enemy2.dmg);

const enemy3 = createEnemies(3, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3', 'url(imgs/watchmen_edit.png)');
let takeDMG3 = enemy3.takeDmg.bind(enemy3);

enemyDMG3.subscribe(takeDMG3);
enemy3.attack(enemy3.dmg);

const enemy4 = createEnemies(4, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3', 'url(imgs/watchmen_edit.png)');
let takeDMG4 = enemy4.takeDmg.bind(enemy4);

enemyDMG4.subscribe(takeDMG4);
enemy4.attack(enemy4.dmg);

const takeDMGArr = [takeDMG0, takeDMG1, takeDMG2, takeDMG3, takeDMG4];
