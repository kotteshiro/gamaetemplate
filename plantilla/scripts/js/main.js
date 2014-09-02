console.log("file:","main.js");
var sprtglobal=window.__sprtglbl=window.__sprtglbl||{};
var _inited=false;
var bg;
var director;
var canvas;
function resize(){
	if(_inited){
			director.setScale(Math.min(window.innerWidth/1024, window.innerHeight/768),Math.min(window.innerWidth/1024, window.innerHeight/768))
			var a=parseInt(Math.min(window.innerWidth/1024, window.innerHeight/768)*1024);
			var h=parseInt(Math.min(window.innerWidth/1024, window.innerHeight/768)*768);
			document.getElementById("wrap").style.width=a+"px";
			document.getElementById("wrap").style.height=h+"px";
			var sobrawidth	=window.innerWidth  - a;
			var sobraheight	=window.innerHeight - h;
			document.getElementById("_c").style["top"]=Math.round(sobraheight/2)+"px";
			document.getElementById("_c").style["left"]=Math.round(sobrawidth/2)+"px";
			console.log("resize...",a,h);
	}
}
function _onLoad(){
	Loader.onBodyLoaded();
	console.log("cargado");
	/***/
	ini(1024,768,'_c',_images,_loaded);//caattemplate.js
	window.onresize = resize;
	window.ondeviceorientation  = resize;
}
function _loaded(dire){
	_inited=true;
	director=dire;
	canvas=director.canvas;
	onloadimgs(director);
	resize();
}
var onloadimgs=function() {
	loading ? loading() : null;
			  // save loaded resources on Director.
	//director.setImagesCache(images);
	/*spmodos= new CAAT.SpriteImage().initialize(director.getImage('modos'), 2, 2);
	spiconos= new CAAT.SpriteImage().initialize(director.getImage('iconos_comandos'), 2, 7);
	spicnsoc= new CAAT.SpriteImage().initialize(director.getImage('iconos_socialesplus'), 2, 6);
	splogogly= new CAAT.SpriteImage().initialize(director.getImage('logogly'));
	spminilogros= new CAAT.SpriteImage().initialize(director.getImage('barra_logros'),3,24);
	sptarjetacolors= new CAAT.SpriteImage().initialize(director.getImage('colors'),1,3);
	spsino= new CAAT.SpriteImage().initialize(director.getImage('sino'),1,2);*/
	
	for(var i in funciones){ 
		funciones[i].sc=director.createScene();
		funciones[i].sc.getAll=function(){
			var arr=[];
			for(var i in this.instancias){
				arr.push(this.instancias[i]);
			}
			return arr;
		};
		funciones[i].cb(funciones[i].sc);
	}
	//toscenaanim(2) //removethis
}
function showEscene(nombre){
	
}