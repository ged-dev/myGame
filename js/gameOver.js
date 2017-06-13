function gameOver(){
	if ((life <= 0 || energy<=0) && loose == 0)
	{
		textGameOver = game.add.text(widthWindow - 220, 150, 'Game Over', { font: "96px Arial", fill: "red", align: "center" });
        textGameOverLine2 = game.add.text(widthWindow - 250, 280, 'Vous avez survécu ' + (120-counter) + ' secondes', { font: "40px Arial", fill: "red", align: "center" });
        textGameOver.fixedToCamera = true;
        textGameOverLine2.fixedToCamera = true;
		player.kill();
        
        textGameOver.alpha = 0.1;
        textGameOverLine2.alpha = 0.1;
        game.add.tween(textGameOver).to( { alpha: 1 }, 2000, "Linear", true);
        game.add.tween(textGameOverLine2).to( { alpha: 1 }, 2000, "Linear", true);

        loose = 1;
        console.log("fonction GameOver exécutée");
	}
}

function winFunction()
{
        if (counter == 0 && loose == 0 && win == 0)
        {
            console.log(win);
            textWin = game.add.text(widthWindow - 350, 150, 'Vous avez survécu !', { font: "72px Arial", fill: "green", align: "center" });
            textWin.fixedToCamera = true;
            console.log("fonction Win exécutée");
            for(let i = 0; i<ennemy.length; i++)
            {
                    ennemy[i].body.velocity.x = 0;
                    ennemy[i].body.velocity.y = 0;
            }
            win = 1;

        }
}