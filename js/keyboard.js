var flipFlop;
// PLAYER INPUT KEYBOARD 
function keyboardPlayer(){
     if (cursors.left.isDown || leftButton.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -300;
        player.animations.play('NW');

    } else if (cursors.right.isDown || rightButton.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 300;
        player.animations.play('SE');
        
    } else if (cursors.up.isDown || upButton.isDown)
    {
        //  Stand still
        player.body.velocity.y = -300;
        player.animations.play('NE');

    } else if (cursors.down.isDown || downButton.isDown)
    {
    	player.body.velocity.y = 300;
    	player.animations.play('SW');
    } else
    {
        player.animations.stop();
    }

    if(jump.isDown)
    {
        
        console.log(flipFlop);
        if(wood >= 2 )
        {
            if(!flipFlop)
            {
                turret = game.add.isoSprite(player.body.x + 100, player.body.y + 10, 0, 'turret', 2, turretGroup);
                game.physics.isoArcade.enable(turret);
                turret.body.collideWorldBounds = true;
                turret.anchor.set(0.5);
                //turret.body.allowRotation = true;
                // Angle RIGHT = 28
                // BOTTOM = 146
                // LEFT = 208
                // TOP = 325

                randomAngle = Math.round(rndNum(3));
                console.log(randomAngle);
                
                turrets.push(turret);
                switch(randomAngle) {
                    case 0:
                        turret.body.rotation = 28;
                        break;
                    case 1:
                        turret.body.rotation = 152;
                        break;
                    case 2:
                        turret.body.rotation = 208;
                        break;
                    case 3:
                        turret.body.rotation = 325;
                        break;
                    default:
                        console.log("switch default");
                }
                wood -= 2;
                turretCreated = 1;
                console.log(wood);
                flipFlop = true;
            }

        }    
    }
    if (jump.isUp) {
        flipFlop = false;
    }
}
