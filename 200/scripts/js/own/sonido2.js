var bgmusic={play:function(){}};
var bgmusicvolumen=1;
soundList = [];
localStorage.bgmute=false;
var sonido={
	init:function(){

		 createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
		// createjs.FlashPlugin.swfPath = "../libs/src/SoundJS/";
		 createjs.Sound.alternateExtensions = ["ogg"];
		 createjs.Sound.addEventListener("fileload", loadHandler);
		 _sonido_espe_=_sonido_espe_||[];
		 var kha=_cfg.assets.sound.concat(_sonido_espe_);
		for(var i in kha){
			if(kha[i])
			createjs.Sound.registerSound(kha[i].url, kha[i].id);
			console.log("kha[i].url",kha[i].url);
			if(kha[i].id == "bgmusic"){
				bgmusicvolumen=1;//kha[i].volume||1;
			}
		}
		var countCargados=0;
		 function loadHandler(event) {

			Loader.onUpdateAudioCounter(i,countCargados);
			//console.warn("sonido",i,countCargados,event.src);
			if(i==countCargados){
				Loader.onAudioLoaded();
			}

			console.log("aidioloader",event);
			 // This is fired for each sound that is registered.
			 if(event.id=="bgmusic"){
				 trace("sonido cargado",event);
				 bgmusic = createjs.Sound.createInstance("bgmusic"); //createjs.Sound.play("bgmusic");  // play using id.  Could also use full sourcepath or event.src.
				 bgmusic.addEventListener("complete", handleComplete);
				 bgmusic.setVolume(bgmusicvolumen)
				bgmusic.setMute(localStorage.bgmute=="true");
				 //bgmusic.play();
			 }
			 countCargados++;
		 }

		 function handleComplete(){
			bgmusic.play();
			sonido.mutebg(sonido.ismutebg())
		 }


	},
	play:function(id, cb,volume){
		volume=volume||1;
		//soundManager.play(id);
		if(soundList[id] === undefined) {
			soundList[id] = createjs.Sound.createInstance(id);
			soundList[id].addEventListener("complete", cb || function() {}); //ojo se setea solo la primera vez.
		}
		console.log("Sonido",soundList[id]);
		soundList[id].setVolume(volume)
		soundList[id].play();
		if(soundList[id] == false)
			console.error(soundList[id],"Error reproduciendo sonido",id);
	},
	playStop:function(id, cb,volume){
		volume=volume||1;
		//soundManager.play(id);
		if(soundList[id] === undefined) {
			soundList[id] = createjs.Sound.createInstance(id);
			soundList[id].addEventListener("complete", cb || function() {});
		}
		soundList[id].setVolume(volume)
		console.log("soud state:",soundList[id].playState);
		if(soundList[id].playState!="playSucceeded"){
			for(var i in soundList){
				if(soundList[i].playState=="playSucceeded"){
					soundList[i].stop();
				}
			}
			soundList[id].play();
		}else{
			soundList[id].stop();
		}

		if(soundList[id] == false)
			console.error(soundList[id],"Error reproduciendo sonido",id);
	},
	playloop:function(id,volume){
		volume=volume||1;
		//soundManager.play(id);
		if(soundList[id] === undefined) {
			soundList[id] = createjs.Sound.createInstance(id);
			soundList[id].addEventListener("complete", function() {	sonido.playloop(id,volume);	});
		}
		soundList[id].setVolume(volume)
		soundList[id].play();
		if(soundList[id] == false)
			console.error(soundList[id],"Error reproduciendo sonido",id);
	},

	ismute:function(){
		localStorage = localStorage || {};
		var mut=localStorage.bgmute || createjs.Sound.getMute();
		switch(mut){
			case "true":
			case true:
				return true;
			break;
			case "false":
			case false:
				return false;
			default:
		}
	},
	mutebg:function(a){
		//k=(a) ? soundManager.mute() : soundManager.unmute();
		if(!bgmusic.setMute) return;
		if(a){
			bgmusic.setMute(true)
		}else{
			bgmusic.setMute(false)
		}
		localStorage.bgmute=(a==true);
	},
	ismutebg:function(){
		localStorage = localStorage || {};
		if(bgmusic && bgmusic.getMute){
			var mut= (localStorage.bgmute=="true") ||bgmusic.getMute();
			localStorage.bgmute=mut;
		}else{
			return localStorage.bgmute=="true" || false;
		}
		return mut;
	},
	stop: function(id) {
		if(soundList[id] !== undefined) {
			soundList[id].stop();
		}
	}
}
