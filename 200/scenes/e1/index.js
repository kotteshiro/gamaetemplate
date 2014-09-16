var ESCNAME="e1";

window.layouts=window.layouts||{};
window._escenafn=window._escenafn||{};
window._escenafn[ESCNAME]=function(escena){
	director.touch="true";
	console.log("cargando escena function",ESCNAME);
	escena.name=ESCNAME;
	currLayout=currLayout || new Layaut();
	escena.loadLayout(window.layouts[ESCNAME]);
	var valoresGlobos=[5,63,65,102,9,85,6,32,54,52,1,2];
	var opa=55;
	var opb=44;
	var ops="x";
	/************ CODE:  **************/
	var globosbtns=[];
	var operacion = new CAAT.TextActor()
			.setFont("bold 56px Trebuchet MS, Helvetica, sans-serif")
			.setTextAlign("center")
			.setTextBaseline("bottom")
			.setPosition(395, 280)
			.setText(opa+" "+ops+" "+opb)
			.setTextFillStyle("#E84E1B")
			.enableEvents(false);
		escena.addChild(operacion);

		setTimeout(function(){
			escena.o.operacion=operacion;
			sube(operacion);
			var blix=0;
			for (var ind in escena.o){
				escena.o[ind].name=escena.o[ind].name||"";
				if(escena.o[ind].name.indexOf("globo")>-1){
					escena.o[ind]=ponertextoinside(valoresGlobos[blix],escena.o[ind],escena);
					blix++;
					convertirBoton(escena.o[ind],function(){});
				}
			}
		}, 500);


		console.log("escena:",escena);

	/*********** END CODE *************/
}

sc(window._escenafn[ESCNAME]);


function convertirBoton(obj, funcion){
	obj.enableEvents(true); //habilitamos eventos
	if(director.touch===true){
		mouseHover(obj,{scaleX:1.1,scaleY:1.1}); //aplicamos comportamiento de mouseHover
	}
	seleccionable(obj,"a","uniq"); //hacemos seleccionable

}
function ponertextoinside(txt,obj,parent){
	var tmp = obj;
	var kaa = new CAAT.ActorContainer();
	var esc = parent||tmp.parent;
	kaa.name= tmp.name;
	kaa.x = tmp.x;
	kaa.y = tmp.y;
	kaa.width = tmp.width;
	kaa.height = tmp.height;
	tmp.y = 0;
	tmp.x = 0;
	tmp.enableEvents(false);


	/**/
	var res = new CAAT.TextActor()
			.setFont("bold 24px Trebuchet MS, Helvetica, sans-serif")
			.setTextAlign("center")
			.setTextBaseline("bottom")
			.setPosition(tmp.width/2, (tmp.height/2)+6)
			.setText(txt)
			.setTextFillStyle("#E84E1B")
			.enableEvents(false);
		esc.removeChild(tmp)
		kaa.addChild(tmp);
		kaa.addChild(res);
		kaa.val=txt;
		esc.addChild(kaa);
		obj=kaa;
		return obj;
}

function mouseHover(el,props){
	if(!el || ! props) return;
	var h0="scaleX|scaleY|x|y|height|width|alpha".split("|");
	var _pi={};

	for(var n in props){
		_pi[n]=el[n]; //guardamos las propiedades originales
	}

	el._pf=props; //dejamos las propiedades a cambiar en el objeto
	el._pi=_pi;  //propiedades iniciales en el objeto
	el.mouseEnter=function(e){
		window.objmoen=window.objmoen||[];

		var el=e.source;
		var props=el._pf;
		pushifnoexist(el,window.objmoen); //agregamos el objeto al "grupo" de botones
		sube(el);
		forceothermouseExit(el);
		if(!el.selected)
			setprops(el,props); //si no está seleccionado aplicamos las nuevas propiedades.
	}

	el.mouseExit=function(e){
		var el=e.source;
		var props=el._pi;
		if(!el.selected) //si no está seleccionado aplicamos las propiedades(las default)
			setprops(el,props);
		else
			sube(el); //si está seleccionado lo subimos para darle foco.
	}
}

function setprops(el,props){
	if(el.enabled===false) return;
	var h0="scaleX|scaleY|x|y|height|width|alpha".split("|");
	for(var m in h0){
		if(props[h0[m]]){
			switch(Number(m)){
				case 0: //scalex
				case 1: //scaley
					if(director.touch===true){
						el.scaleX=props[h0[0]]||1;
						el.scaleY=props[h0[1]]||1;
					}else{
						el.scaleTo(props[h0[0]]||1,props[h0[1]]||1,200)
					}
				break;
			}
		}
	}
}

function forceothermouseExit(exclude){
	//gallita el evento "mouseExit" en todos los objetos de "window.objmoen"
	window.objmoen=window.objmoen||[];
	for(var y in window.objmoen){
		if(exclude!=window.objmoen[y]){
			window.objmoen[y].mouseExit({source:window.objmoen[y]});

		}
	}
}

function seleccionable(obj,grupo,selecty){
	//crea un objeto seleccionable,
	//obj: objeto a aplicar las propiedades
	//grupo: grupo de botones
	//selecty: ("uniq","multi") forma de selecion dentro del grupo, seleccion unica, o seleccion de varios elementos
	selecty=selecty||"uniq";
	grupo=grupo||"a";
	window.gruposselec=window.gruposselec||{};
	window.gruposselec[grupo]=window.gruposselec[grupo]||[];
	obj.selectType=selecty;
	obj.grupo =	window.gruposselec[grupo];
	pushifnoexist(obj,window.gruposselec[grupo])
	obj.mouseClick=function(e){
		var obj = e.source;
		var grupo=obj.grupo;
		switch(obj.selectType){
			case "uniq":
					for(var t  in grupo){
						grupo[t].deSelect();
					}
					obj.select();
			break;
			case "multi":
					if(obj.selected)
						obj.deSelect();
					else{
						obj.select();
					}
			break;
		}
	}

	obj.deSelect=function(){
		this.selected=false;
		setprops(this,{scaleX:1,scaleY:1})
	}
	obj.select=function(){
		this.selected=true;
		sube(this);
		setprops(this,{scaleX:1.4,scaleY:1.4})
	}
}
function getSelected(grupo){
	grupo=grupo||"a";
	var g=window.gruposselec[grupo];
	var seleccionados=[];
	for(var h in g){
		if(g[h].selected){
			seleccionados.push(g[h]);
		}
	}
	if(seleccionados.length==1)
		return seleccionados[0];
	else
		return seleccionados
}
