var Loader={
	porcentajeTotal:0,
	porcentajeImagenes:0,
	porcentajeAudios:0,
	totunitstoload:3,
	unitstoload:0, // son 3 (img,sound,body)
	
	update: function(){
		this.porcentajeTotal=((this.unitstoload/3)*.2)+(this.porcentajeImagenes*.4)+(this.porcentajeAudios*.4)
		this.porcentajeTotal=Math.round(this.porcentajeTotal*100);
		
		console.log("cargado=",this.porcentajeTotal);
		console.info("Unidades="+Math.round((this.unitstoload/3)*100),"Imagenes="+Math.round(this.porcentajeImagenes*100),"Audios="+Math.round((this.porcentajeAudios)*100))
		if(this.unitstoload==3){
			this.porcentajeTotal=100;
			//this.onFullLoaded();
			
			document.getElementById("loadinglayer").style["opacity"]="0";
			document.getElementById("loadinglayer").style["filter"]="alpha(opacity=50)";
			document.getElementById("loadinglayer").style["-webkit-transition"]="opacity 1s linear";

			setTimeout(this.onFullFullLoaded, 1000);
		}
		document.getElementById("textoLoading").innerHTML=this.porcentajeTotal+"% cargado";
		document.getElementById("loadinglayer").style["z-index"]="999";
	},
	onImgLoaded:function(){ //llamar cuando se cargan las imagenes
		console.warn("IMGS CARGADOS!");
		this.unitstoload++;
		this.porcentajeImagenes=1;
		this.update();
	},
	onAudioLoaded:function(){ //llamar cuando se cargan los sonidos
		console.warn("AUDIOS CARGADOS!");
		this.unitstoload++;
		this.porcentajeAudios=1;
		this.update();
	},
	onBodyLoaded:function(){ //llamar en el onLoad del body
		console.warn("BODY CARGADOS!");
		this.unitstoload++;
		this.update();
	},
	onFullFullLoaded:function(){
		document.getElementById("loadinglayer").style.display="none"
	},
	onUpdateImgsCounter:function(act,tot){
		this.porcentajeImagenes=act/tot;
		this.update();
	},
	onUpdateAudioCounter:function(tot,act){
		console.log("audiocounter",tot/act,tot,act);
		this.porcentajeAudios=act/tot;
		this.update();
	}
	
}