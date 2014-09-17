var ESCNAME="e1";

window.layouts=window.layouts||{};
window._escenafn=window._escenafn||{};
window._escenafn[ESCNAME]=function(escena){
	director.touch="true";
	console.log("cargando escena function",ESCNAME);
	escena.name=ESCNAME;
	currLayout=currLayout || new Layaut();
	escena.loadLayout(window.layouts[ESCNAME]);

	/************ CODE:  **************/
	//generador de random:

	var radhe=[]
		function llenarr(){
			radhe=[],TO=12;
			for(var i=0;i<=TO;i++){
				radhe=insertRandom(i,radhe)
			}
		}
		llenarr();
		$ra=function(){if(radhe.length<1) llenarr(); return radhe.pop() };
	//end genrand
		function llenardistract(a,b){
			var chu=[];
			var vez=0;

			chu=[];
			chu[0]=a+b;
			chu[1]=(a-b)>0 ? (a-b) : (b-a);
			chu[2]=a*b;
			chu[3]=a*b*(b+1);
			chu[4]=a*b*(b-1);
			chu[5]=(a*b)*10;
			chu[6]=(a+b)*10;
			chu[7]=(a+b)*a;
			chu[8]=(a+b)*b;
		 	window.krn=[];
			for(var g in chu){
				krn=insertRandom(chu[g],krn)
			}
			window.$re=function(){if(krn.length<1) llenardistract(a,b); return krn.pop() };
	}
	do{
		var opa=$ra();
		var opb=$ra();
		llenardistract(opa,opb);
		var unico=false;
		var sum=0;
		for(var ai in krn){
			for(var bi=0 in krn){
				if(krn[ai]==krn[bi]){
					sum++;
				}
			}
		}
		console.log("sum:",sum);
		if(sum<=9){
			unico=true;
		}
	}while(!unico);
	var valoresGlobos=[$re(),$re(),$re(),$re(),$re(),$re(),$re(),$re(),$re()];
	var ops="x";
	window.resultado=opa*opb;
	var globosbtns=[];

	//valoresGlobos=insertRandom(resultado,valoresGlobos)
	var operacion = new CAAT.TextActor()
			.setFont("bold 56px Trebuchet MS, Helvetica, sans-serif")
			.setTextAlign("center")
			.setTextBaseline("bottom")
			.setPosition(395, 280)
			.setText(opa+" "+ops+" "+opb)
			.setTextFillStyle("#E84E1B")
			.enableEvents(false);
		escena.addChild(operacion);

		setTimeout(function(){ //cambiar!! debería entrar aqui cuando se cargan el layout
			escena.o.operacion=operacion;
			sube(operacion);
			var blix=0;
			for (var ind in escena.o){
				escena.o[ind].name=escena.o[ind].name||"";
				if(escena.o[ind].name.indexOf("globo")>-1){
					escena.o[ind]=ponertextoinside(valoresGlobos[blix].toLocaleString(),escena.o[ind],escena);
					blix++;
					convertirBoton(escena.o[ind],function(){});
				}
			}
			SETUP();

			setTimeout(function(){
				hideshow("show",director.currentScene.o.instruccion,6)
			}, 1500);
		}, 500);




		console.log("escena:",escena);

	/*********** END CODE *************/
}

sc(window._escenafn[ESCNAME]);

/*******************************/
/*******************************/

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

		somethinghappend();
	}

	el.mouseExit=function(e){
		var el=e.source;
		var props=el._pi;
		if(!el.selected) //si no está seleccionado aplicamos las propiedades(las default)
			setprops(el,props);
		else
			sube(el); //si está seleccionado lo subimos para darle foco.
	}

	somethinghappend();
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

					if(obj.selected===true){
						obj.deSelect();
					}else{
						for(var t  in grupo){
							grupo[t].deSelect();
						}
						obj.select();
					}
			break;
			case "multi":
					if(obj.selected)
						obj.deSelect();
					else{
						obj.select();
					}
			break;
		}
		somethinghappend();
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
		if(g[h].selected===true){
			seleccionados.push(g[h]);
		}
	}
	if(seleccionados.length==1)
		return seleccionados;
	else
		return seleccionados
}

function insertRandom(val, array){
	var l=array.length;
	var ix=randTo(l)+1;
	var ai=array.splice(0,ix);
	var af=array;
	array=ai.concat([val].concat(af));
	return array
}
function genb(){
	var bytmp=[];
	var k=[];
	var nums=[];
	var sumas=[];
	for (var o=0;o<8*500;o++){
		k=insertRandom(randTo(2),k);
	}
	for(var h in k){
		if(bytmp.length+1<9){
			bytmp.push(k[h]);
		}else{
			nums.push(bintodec(bytmp))
			bytmp=[];
		}
	}
	nums=nums.sort();
	for(var g in nums){
		if(!sumas[nums[g]]){
			sumas[nums[g]]=0;
		}
		sumas[nums[g]]++;
	}
	console.log(sumas);
}

function bintodec(arr){
	return (arr[0]*128)+(arr[1]*64)+(arr[2]*32)+(arr[3]*16)+(arr[4]*8)+(arr[5]*4)+(arr[6]*2)+(arr[7]*1);
}
function valido(){
	var c=getSelected();
	if(listo())
		return c[0].val==resultado;
	else
		return false;
}
function listo(){
	return getSelected().length>0;
}

function somethinghappend(){
	var k=director.currentScene.o.btnlisto
	if(listo()){
		hideshow("show",k,2)
	}else{
		hideshow("hide",k,2)
	}

	console.log("valido/listo",valido(),listo());
}
function hideshow(ac,k,origen){

	var dis=20;
	var posfx=k.originalpos.x;
	var posfy=k.originalpos.y;
	var nx=0,ox=0;
	var ny=0,oy=0;
	var di=1;
	if(k.ac==ac){
		return;
	}
	k.ac=ac;

	//	ORIGEN:
	//    7  8  9
	//    4  5  6
	//    1  2  3
	//
	//se ubica en la posición fuera

	switch(origen){
		case 8:
			dis=(k.originalpos.y+k.height*1.2);
			ox=posfx;
			oy=posfy-(dis*di);

			nx=posfx;
			ny=oy+(dis*di);
		break;
		case 4:
			dis=k.originalpos.y+(k.width*2.2);
			ox=posfx-(dis*di);
			oy=posfy;

			nx=ox+dis;
			ny=posfy
		break;
		case 6:
			var widthe=890;//director.currentScene.width;
			dis=widthe-k.originalpos.y;
			ox=posfx+(dis*di);
			oy=posfy;
			nx=ox-(dis*di);
			ny=posfy;
		break;
		case 2:
			var heighte=590;//director.currentScene.height;
			dis=(heighte-k.originalpos.y)*1.2;
		//	dis=k.height*1.1;
			ox=posfx;
			oy=posfy+(dis*di);
			nx=posfx;
			ny=oy-(dis*di);
		break;
	}

	if(ac=="show"){
		k.x=ox;
		k.y=oy;
		var di=dist(ox,oy,nx,ny);
		k.moveTo( nx, ny, (100*di)/1000, 10 ,new CAAT.Interpolator().createBounceOutInterpolator(0,false));
	}else{
		k.x=nx;
		k.y=ny;
		var di=dist(nx,ny,ox,oy);
		k.moveTo( ox, oy, 100*(100/di), 10,new CAAT.Interpolator().createBounceOutInterpolator(0,false));

	}
}

function SETUP(){
	var o=director.currentScene.o;
	var tosaveprop=["instruccion","btnlisto"];
	var objstos=[];
	for(var ka in tosaveprop){
		var obj=o[tosaveprop[ka]];
		objstos.push(obj);
	}
	for(var t in objstos){
		var k=objstos[t];
		var pos={x:k.x , y:k.y}
		k.originalpos=pos;
		hideshow("hide",k,2)
	}
}
function dist(x1,y1,x2,y2){
	return Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
}
