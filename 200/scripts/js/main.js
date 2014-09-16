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
	document.title = _cfg.title;
}
function _loaded(dire){
	_inited=true;
	director=dire;
	canvas=director.canvas;
	onloadimgs(director);
	window.GM=new GameMaster(director);
	resize();
}
var onloadimgs=function() {
	loading ? loading() : null;
	for(var i in funciones){
		funciones[i].sc=director.createScene();
		funciones[i].sc.getAll=function(){
			var arr=[];
			for(var ia in this.instancias){
				arr.push(this.instancias[ia]);
			}
			return arr;
		};
		funciones[i].cb(funciones[i].sc);
	}
}

function showEscene(nombre){

}
