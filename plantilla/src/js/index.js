if(Audio==undefined){
		//alert("Su navegador no soporta 'Audio' en HTML5, por favor actualice.");
		Audio = Audio || function(){}
	}
	var sprtglobal=window.__sprtglbl=window.__sprtglbl||{};
	var _inited=false;
	var bg;
	var director;
	var canvas;
	function resize(){
		if(_inited){
		//if(window.innerHeight<768 || window.innerWidth<1024){
				director.setScale(Math.min(window.innerWidth/1024, window.innerHeight/768),Math.min(window.innerWidth/1024, window.innerHeight/768))
				var a=parseInt(Math.min(window.innerWidth/1024, window.innerHeight/768)*1024);
				var h=parseInt(Math.min(window.innerWidth/1024, window.innerHeight/768)*768);
				document.getElementById("wrap").style.width=a+"px";
				document.getElementById("wrap").style.height=h+"px";
				var sobrawidth	=window.innerWidth  - a;
				var sobraheight	=window.innerHeight - h;
				document.getElementById("_c").style["top"]=Math.round(sobraheight/2)+"px";
				document.getElementById("_c").style["left"]=Math.round(sobrawidth/2)+"px";
				//document.getElementById("_c").style.width=a+"px";
				console.log("resize...",a,h);
		//	}
		}
	}
	function _onLoad(){
		Loader.onBodyLoaded();
		console.log("cargado");
		sonido.init();
		ini(1024,768,'_c',_images,_loaded);//caattemplate.js
		/***/
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