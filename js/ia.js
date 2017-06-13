let waveNbr = 0;
let positionMin = 10;
let velocityMin = 10;
let velocityMax = 50;

function ia()
{

}


waveInterval = setInterval(function()
    {
        waveFunction(wave, nbEnnemies);
        nbEnnemies += 1;
        wave=true;
    }, 10000);

    // CREATION DES ENNEMIS SKELETTES \\
    // ------------------------------ \\

function waveFunction(wave, nbEnnemies) 
{
	console.log("Wave state " + wave);
	if(wave && loose == 0 && win == 0)
	{

		//Ennemis WAVE from LEFT
		creatingEnnemies(nbEnnemies, 
						0, 0, // X min, max
						positionMin, 800, // Y min, max
						velocityMin, velocityMax, // Velocity X min, max
						0, 0,	// Velocity Y min, max
						'walkRight' 
						 );

		// Ennemis WAVE from UP
		creatingEnnemies(nbEnnemies, 
						positionMin, 1700, // X min, max
						positionMin, 20, 	// Y min, max
						0, 0, 	// Velocity X min, max
						velocityMin, velocityMax,	// Velocity Y min, max
						'walkLeft'	
						);	

		// Ennemis WAVE from BOTTOM
		creatingEnnemies(nbEnnemies, 
						positionMin, 1700, // X min, max
						1650, 1700, // Y min, max
						0, 0, 	// Velocity X min, max
						-velocityMin, -velocityMax,	// Velocity Y min, max
						'walkRight'	
						);	

		// Ennemis WAVE from RIGHT
		creatingEnnemies(nbEnnemies, 
						1800, 1900, // X min, max
						positionMin, 1200, 	// Y min, max
						-velocityMin, -velocityMax, 	// Velocity X min, max
						0, 0,	// Velocity Y min, max
						'walkLeft'	
						);	
		// creatingEnnemies(nbEnnemies);
	    wave = false;
	    
	    
    }
    waveNbr++;
    console.log("wave Number " + waveNbr); 
}


function creatingEnnemies(nbEnnemies, 
							randXmin, randXmax, 
							randYmin, randYmax, 
							velocityXmin, velocityXmax, 
							velocityYmin, velocityYmax,
							animationDirection)
{
	for (var i = 0; i < nbEnnemies; i++)
	{
	        skeleton = game.add.isoSprite(game.rnd.between(randXmin, randXmax), game.rnd.between(randYmin, randYmax), 0, 'skeleton', 0, obstacleGroup);
	        game.physics.isoArcade.enable(skeleton);
	        ennemy.push(skeleton);
	        
	        addAnimationToSprites();
	        // Permet au sprite de ne pas tomber dans le vide
	        skeleton.body.collideWorldBounds = true;
	        skeleton.body.velocity.x = game.rnd.between(velocityXmin, velocityXmax);
	        skeleton.body.velocity.y = game.rnd.between(velocityYmin, velocityYmax);
	        skeleton.animations.play(animationDirection);
	        skeleton.scale.setTo(1.5, 1.5);
	        waveNbr++;
	}
}

	    // FIN CREATION ENNEMIS --------- \\