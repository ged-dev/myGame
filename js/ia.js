function ia()
{
	if(player.body.x >= skeleton.body.x)
	{
		skeleton.animations.play('walkRight');
		skeleton.body.velocity.x = 70;
	}else
	{
		skeleton.animations.play('walkLeft');
		skeleton.body.velocity.x = -70;
	}

	//skeleton.body.velocity.y = 70;

	if(player.body.y >= skeleton.body.y)
	{
		skeleton.body.velocity.y = 70;
	}else
	{
		skeleton.body.velocity.y = -70;
	}
}