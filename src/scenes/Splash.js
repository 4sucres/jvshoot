const { version } = require('../../package.json');
import Phaser from 'phaser'

import WatchJS from 'melanke-watchjs';

var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var callWatchers = WatchJS.callWatchers;

const slideDelay = 2000;

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'SplashScene' })
  }

  preload () {
    this.cameras.main.setBackgroundColor(0x000000)
  }

  create () {
    let explode = this.sound.add("explode")
    let explode_alt = this.sound.add("explode_alt")
    let background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'space')
    background.setAlpha(0)

    this.slides = {
      intro: this.add.container(0, 0),
      credits: this.add.container(10, 100),
    }

    // Intro
    let text = this.add.bitmapText(this.game.config.width / 2, this.game.config.height / 2, 'white_shadow', 'SUCRESWARE', 16).setOrigin(0.5)
    this.slides.intro.add(text);

    // Credits
    let top = 0;

    text = this.add.bitmapText(0, top, 'white_shadow', 'THIS IS ANOTHER', 8)
    this.slides.credits.add(text)
    top += 15;
    text = this.add.bitmapText(0, top, 'white_shadow', 'OPEN-SOURCE PROJECT', 8)
    this.slides.credits.add(text)
    top += 15;
    text = this.add.bitmapText(0, top, 'white_shadow', 'FROM 4SUCRES.ORG', 8)
    this.slides.credits.add(text)
    top += 60;

    text = this.add.bitmapText(0, top, 'indigo', 'DEVELOPED BY', 8)
    this.slides.credits.add(text)
    top += 15;
    text = this.add.bitmapText(0, top, 'white_shadow', 'MGK', 16)
    this.slides.credits.add(text)
    top += 30;
    text = this.add.bitmapText(0, top, 'indigo', 'DESIGNED BY', 8)
    this.slides.credits.add(text)
    top += 15;
    text = this.add.bitmapText(0, top, 'white_shadow', 'BLOOD', 16)
    this.slides.credits.add(text)
    top += 30;
    text = this.add.bitmapText(0, top, 'indigo', 'MUSIC FROM', 8)
    this.slides.credits.add(text)
    top += 15;
    text = this.add.bitmapText(0, top, 'white_shadow', 'DUBMOOD', 16)
    this.slides.credits.add(text)

    this.slides.credits.setAlpha(0);

    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.input.addPointer(1);

    watch(this.input.pointer1, "isDown", (key, action, value) => value ? this.next(value) : '')
    watch(this.keySpace, "isDown", (key, action, value) => value ? this.next(value) : '')

    this.time.addEvent({
      delay: slideDelay,
      callback: () => {
        this.cameras.main.shake(200, 0.05)
        explode.play()

        this.slides.intro.setAlpha(0);
        this.slides.credits.setAlpha(1);
        background.setAlpha(1)

        this.time.addEvent({
          delay: slideDelay * 2,
          callback: () => this.scene.start('MenuScene'),
          callbackScope: this,
          loop: false
        })
      },
      callbackScope: this,
      loop: false
    })

    this.cameras.main.shake(200, 0.01)
    explode_alt.play()
  }

  next(value) {
    this.scene.start('MenuScene');
  }
}
