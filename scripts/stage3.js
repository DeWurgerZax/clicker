'use strict';

const stage3 = () => {
  console.log('stage 3 starts');
  //obsArray = null;
  enemyDMG0 = null;
  enemyDMG1 = null;
  enemyDMG2 = null;
  enemyDMG3 = null;
  enemyDMG4 = null;
  enemyDMG0 = new Observer();
  enemyDMG1 = new Observer();
  enemyDMG2 = new Observer();
  enemyDMG3 = new Observer();
  enemyDMG4 = new Observer();
  obsArray = [enemyDMG0, enemyDMG1, enemyDMG2, enemyDMG3, enemyDMG4];
  //console.log(obsArray);
  //heroTakeDMG.subscribe(playerTakeDmg);
  document.body.style.backgroundImage = 'url(imgs/third.jpg)';
  createItems(10);
  const stage3enemy0 = createEnemies(0, 110, 25, 'sounds/bear_attack.mp3', 'sounds/bear_dead.mp3', 'url(imgs/bear_edit.png)');
  const takeDMG0 = stage3enemy0.takeDmg.bind(stage3enemy0);

  enemyDMG0.subscribe(takeDMG0);
  stage3enemy0.attack(stage3enemy0.dmg);

  //stage2enemy0.style.backgroundImage = 'imgs/bear_edit.png';
  //document.body.append(stage2enemy0);

  const stage3enemy1 = createEnemies(1, 80, 35, 'sounds/librer_attack.mp3', 'sounds/librer_dead.mp3', 'url(imgs/libra_edit.png)');
  const takeDMG1 = stage3enemy1.takeDmg.bind(stage3enemy1);

  enemyDMG1.subscribe(takeDMG1);
  stage3enemy1.attack(stage3enemy1.dmg);

  const stage3enemy2 = createEnemies(2, 80, 35, 'sounds/librer_attack.mp3', 'sounds/librer_dead.mp3', 'url(imgs/libra_edit.png)');
  const takeDMG2 = stage3enemy2.takeDmg.bind(stage3enemy2);

  enemyDMG2.subscribe(takeDMG2);
  stage3enemy2.attack(stage3enemy2.dmg);

  const stage3enemy3 = createEnemies(3, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3', 'url(imgs/watchmen_edit.png)');
  const takeDMG3 = stage3enemy3.takeDmg.bind(stage3enemy3);

  enemyDMG3.subscribe(takeDMG3);
  stage3enemy3.attack(stage3enemy3.dmg);

  const stage3enemy4 = createEnemies(4, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3', 'url(imgs/watchmen_edit.png)');
  const takeDMG4 = stage3enemy4.takeDmg.bind(stage3enemy4);

  enemyDMG4.subscribe(takeDMG4);
  stage3enemy4.attack(stage3enemy4.dmg);

  //const takeDMGArr = [takeDMG0, takeDMG1, takeDMG2, takeDMG3, takeDMG4];
}