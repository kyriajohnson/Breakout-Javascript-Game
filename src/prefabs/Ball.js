import Phaser from 'phaser'

class Ball extends Phaser.Sprite {

    constructor(game, x , y) {
        super(game, x, y, 'ball');

        //enable physics for this object
        this.game.physics.arcade.enableBody(this);

        //set to react to screen edges
        this.checkWorldBounds = true;
        this.body.collideWorldBounds = true;

        this.body.bounce.set(1);

    }

}
export default Ball
