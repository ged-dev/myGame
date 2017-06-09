function gameOver(){
	if (life <= 0 && loose == 0)
	{
		textGameOver = game.add.text(widthWindow - 150, 200, 'Game Over', { font: "96px Arial", fill: "black", align: "center" });
		player.kill();
        //textGameOver.anchor.setTo(1.1, 0.2);
        textGameOver.fixedToCamera = true;
        // obstacleGroup.body.velocity.x = 0;
        // obstacleGroup.body.velocity.y = 0;
        // obstacleGroup.animations.stop();
        loose = 1;
        console.log("fonction GameOver exécutée");

	}
}