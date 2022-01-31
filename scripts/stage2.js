'use strict';

const stage2 = () => {
  console.log('stage 2 starts');
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
  document.body.style.backgroundImage = 'url(imgs/second.jpg)';
  createItems(5);
  const stage2enemy0 = createEnemies(0, 110, 25, 'sounds/bear_attack.mp3', 'sounds/bear_dead.mp3', 'url(imgs/bear_edit.png)');
  const takeDMG0 = stage2enemy0.takeDmg.bind(stage2enemy0);

  enemyDMG0.subscribe(takeDMG0);
  stage2enemy0.attack(stage2enemy0.dmg);

  //stage2enemy0.style.backgroundImage = 'imgs/bear_edit.png';
  //document.body.append(stage2enemy0);

  const stage2enemy1 = createEnemies(1, 110, 25, 'sounds/bear_attack.mp3', 'sounds/bear_dead.mp3', 'url(imgs/bear_edit.png)');
  const takeDMG1 = stage2enemy1.takeDmg.bind(stage2enemy1);

  enemyDMG1.subscribe(takeDMG1);
  stage2enemy1.attack(stage2enemy1.dmg);

  const stage2enemy2 = createEnemies(2, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3', 'url(imgs/watchmen_edit.png)');
  const takeDMG2 = stage2enemy2.takeDmg.bind(stage2enemy2);

  enemyDMG2.subscribe(takeDMG2);
  stage2enemy2.attack(stage2enemy2.dmg);

  const stage2enemy3 = createEnemies(3, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3', 'url(imgs/watchmen_edit.png)');
  const takeDMG3 = stage2enemy3.takeDmg.bind(stage2enemy3);

  enemyDMG3.subscribe(takeDMG3);
  stage2enemy3.attack(stage2enemy3.dmg);

  const stage2enemy4 = createEnemies(4, 50, 10, 'sounds/watchmen_sound.mp3', 'sounds/watchmen_damaged.mp3', 'url(imgs/watchmen_edit.png)');
  const takeDMG4 = stage2enemy4.takeDmg.bind(stage2enemy4);

  enemyDMG4.subscribe(takeDMG4);
  stage2enemy4.attack(stage2enemy4.dmg);

  //const takeDMGArr = [takeDMG0, takeDMG1, takeDMG2, takeDMG3, takeDMG4];
}
