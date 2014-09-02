var cohete_;
sc(function(escena){
	escena.name="scintro";
	escena.setClip(true);
	trace(">scintro espacio");
	
 	//var bg = animbg(escena),
		bgIntro = obj("bgSpace", escena, "bgIntro", 0, 0, 1, 1);
	
	var earthCont	= new CAAT.ActorContainer()
		.setBounds(160, 420, 719, 359.5),
		bgStars = new CAAT.Actor()
			.setLocation(-405, -100)
			.setBackgroundImage(director.getImage("bgStars"))
			.addBehavior(new CAAT.RotateBehavior().setCycle(true).setFrameTime(0, 8000000).setValues(0, -360)),
		earthActor = new CAAT.Actor()
			.setLocation(-214, 60)
			.setSize(719, 719)
			.setBackgroundImage(director.getImage("earthIntro"))
			.addBehavior(new CAAT.RotateBehavior().setCycle(true).setFrameTime(0, 3000000).setValues(0, -360));
		window.earthActor=earthActor;
	earthCont.addChild(earthActor);
	escena.addChild(bgStars);
	estrella(escena)
	escena.addChild(earthCont);
	
	/* COHETE! */
	var cohetec = new CAAT.ActorContainer();
	var ka=director.getImage('sprite-motor');
	var simotor= new CAAT.SpriteImage().initialize(ka,5,13);
	var sec=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60 ,61 ,62, 63, 64];
	var fire = new MovieClipSprite(simotor.getRef(), sec,75, 0, 60);
	
    cohetec.setBounds(200, 118,1,1);
	cohetec.addChild(fire.getActor());
	
	var cohete=obj("scintro4",cohetec,'cohete',98, 0,1,1);
	
	window.cohete=cohetec;
	cohetec.x=270;
	cohetec.y=158;
	escena.addChild(cohetec);
	
	tweenTranslation("tituloanim1",cohetec,30000,cohetec.x+100,cohetec.y,new CAAT.Interpolator().createExponentialInOutInterpolator(true,1),true,0,0,0);
	
	window.textoa=obj("texto_intro",escena,'texto_intro',335, 720,1,1);

	var zonamouseClick=function(e){  
		trace("entra",bg);
		bgmusic.play();
		toscenaanim(1)
	}
	btn("scintro211",escena,{sprite:[getsprt("zonasensiblefull",1,2), 1, 1],x:0,y:0,click:zonamouseClick});
	btn("scintro311",escena,{sprite:[getsprt("zonasensiblefull",1,2), 1, 1],x:0,y:384,click:zonamouseClick});
	//btn("scintro4_", escena, {sprite:[splogogly, 1, 1], x:341, y:343-50, click:mmcl}).setScale(1.5, 1.5);
	//window.document.addEventListener("touchstart",zona.mouseClick);
	
});

function estrella(donde) {
	
		
		var NS= 1;
		for( var i=0; i<NS; i++ ) {
			donde.estrella=donde.estrella||obj(uniq("estrella"), donde, "estrella", 0, 0, 1, 1);
			var star= donde.estrella;
			
			/*star.addBehavior(
							new CAAT.Behavior.PathBehavior().
									setFrameTime( donde.time, 600+(400*Math.random()) ).
									setPath(
											new CAAT.PathUtil.Path().
													beginPath( 0,0 ).
													addQuadricTo( 8, 4, 3, 1 ).
													endPath()
									)
							).
					setDiscardable(true).
					setFrameTime( donde.time, Number.MAX_VALUE );
		}*/
		
			var x= (Math.random()<.5?0:donde.width);
			var y= -200;//donde.y+donde.height/2;
			var sgnX= (Math.random()<.5?1:-1);
			var sgnY= (Math.random()<.5?1:-1);
			var cpx= x+ (500+Math.random()*80)*sgnX;
			var cpy= y+ (20+Math.random()*40)*sgnY;

			var fpy= director.height-200;//+(50*Math.random());
			var fpx= cpx+(80*Math.random())*sgnX;

			star.emptyBehaviorList().
					addBehavior(
							new CAAT.Behavior.PathBehavior().
									setFrameTime( donde.time, 6000 ).
									setPath(
											new CAAT.PathUtil.ArcPath().
											initialize(donde.width/2,donde.height, 600+(Math.random()*200), Math.PI*2).
											//setClockWise((Math.random()<.5?1:0))
											setClockWise(true)
									).
									addListener( {
											behaviorExpired : function(behavior, time, actor) {
												actor.setExpired(true);
												estrella(donde);
												//starCache.push(actor);
											}
									}).
									setAutoRotate(true)
							).
					setDiscardable(true).
					setFrameTime( donde.time, Number.MAX_VALUE );

		//	donde.addChild(star);
		}
}