console.log("file:","main.js");
var sprtglobal=window.__sprtglbl=window.__sprtglbl||{};
var _inited=false;
var bg;
var director;
var canvas;
function resize(){
	if(_inited){

			var a=parseInt(Math.min(window.innerWidth/_cfg.width, window.innerHeight/_cfg.height)*_cfg.width);
			var h=parseInt(Math.min(window.innerWidth/_cfg.width, window.innerHeight/_cfg.height)*_cfg.height);
			if(a<=_cfg.width && h <= _cfg.height){
				director.setScale(Math.min(window.innerWidth/_cfg.width, window.innerHeight/_cfg.height),Math.min(window.innerWidth/_cfg.width, window.innerHeight/_cfg.height))
				document.getElementById("wrap").style.width=a+"px";
				document.getElementById("wrap").style.height=h+"px";
			}
			var sobrawidth	=window.innerWidth  - a+25;
			var sobraheight	=window.innerHeight - h;

			document.getElementById("_c").style["top"]=Math.round(sobraheight/2)+"px";
			document.getElementById("_c").style["left"]=Math.round(sobrawidth/2)-25+"px";
			console.log("resize...",a,h,sobrawidth,sobraheight);
	}
}
function _onLoad(){
	Loader.onBodyLoaded();
	console.log("cargado");
	/***/
	ini(_cfg.width,_cfg.height,'_c',_images,_loaded);//caattemplate.js

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
