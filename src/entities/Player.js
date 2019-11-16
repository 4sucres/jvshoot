import Phaser from 'phaser'
import Entity from './Entity'
import PlayerLaser from './PlayerLaser'

export default class extends Entity {
  constructor (scene, x, y, asset) {
    super(scene, x, y, asset, 'Player')

    this.setData("speed", 200)
    this.setData("isShooting", false)
    this.setData("timerShootDelay", 10)
    this.setData("timerShootTick", this.getData("timerShootDelay") - 1)
  }

  moveUp() {
    this.body.setVelocityY(-this.getData("speed"))
  }

  moveDown() {
    this.body.setVelocityY(this.getData("speed"))
  }

  moveLeft() {
    this.body.setVelocityX(-this.getData("speed"))
  }

  moveRight() {
    this.body.setVelocityX(this.getData("speed"))
  }

  onDestroy() {
    this.scene.bgm.stop();
    this.scene.time.addEvent({
      delay: 3000,
      callback: function() {
        this.scene.scene.start("SplashScene");
      },
      callbackScope: this,
      loop: false
    });
  }

  update() {
    this.body.setVelocity(0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData("isShooting")) {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
        this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      } else { // when the "manual timer" is triggered:
        var laser = new PlayerLaser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);

        this.scene.sfx.laser.play(); // play the laser sound effect
        this.setData("timerShootTick", 0);
      }
    }
  }
}
