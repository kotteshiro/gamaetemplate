var currLayout,objOnthefly,selected,czindex=0; 
function Obj(id, src, x, y){
	this.id=id;
	this.src=src;
	this.x=x;
	this.y=y;
	
	this.enableMove=function(){
		
	}
}
function Layaut(){
	this.objs=[];
	this.addObj=function(obj){
		this.objs.push(obj);
		var imgid=2;
		ponerAlVuelo(obj.src,obj.id,obj.x,obj.y);
		//obj(uniq("b"),GM.director.currentScene,imgid,0,0,1,1);
		
		//this.synco();
	}
	
	this.synco=function(){
		for(var jk in this.objs){
			var mk=this.objs[jk];
			mk.x=mk.objeto.x;
			mk.y=mk.objeto.y;
		}
	}
	
	this.exporta=function(){
		var objtoexp=[];
		for(var jk in this.objs){
			var mk=this.objs[jk];
			var otmp={};
			for(var lp in mk){
				if(lp!="objeto")
					otmp[lp]=mk[lp]
			}
			objtoexp.push(otmp);
			
		}
		return JSON.stringify(objtoexp);
	}
	
	this.save=function(savename){
		savename=savename||"guardado";
		this.synco();
		var ex=this.exporta();
		window.localStorage.setItem(savename,ex);
		var blob = new Blob(["var layaout="+ex], {
			type: "text/json;charset=utf-8;",
		});
		saveAs(blob, savename+".js")
	}
	this.load=function(obj){
	
		for (var ka in obj){
			var hai=obj[ka];
			savekh(hai.src,hai.id,hai.x,hai.y);
		}
	}
}


function cargaImg(imageURL,id,cb){
	cb=cb||function(){};
	new CAAT.ImagePreloader().loadImages(
        [{url:imageURL,id:id}],
        function( counter, images ) {
            director.setImagesCache(images);
			console.log("imagen cargada");
			cb(id);
        }
    );
}

function ponerAlVuelo(urlimg, id,x,y){
	x=x||0;
	y=y||0;
	id=id||uniq("noid");
	objOnthefly=objOnthefly||[];
	cargaImg(urlimg,id,cargado);
	function cargado(idimg){
		var ka=obj(idimg,GM.director.currentScene,idimg);
		ka.x=x;
		ka.y=y;
		ka.mouseEnabled=true;
		ka.enableDrag();
		ka.mouseEnabled=true;
		ka.mouseDown=selectProps;
		ka._zindex=czindex;
		czindex++;
		objOnthefly.push(ka);
		linktoObj();
	}
}

function selectProps(e){
	if(!e) return;
	var ob=e.source;
	/*$("#img").attr("src",ob._obj.src);
	$("#iditem").val(ob._obj.id)
	selected=ob;*/
	sel(ob._obj.id);
}

function se(e){
	
}

function sel(cual){
	var otf;
	for(var g in objOnthefly){
		otf=objOnthefly[g];
		if(otf.name==cual){
			break;	
		}
	}
	selected=otf;
	if(!selected) return;
	$("#img").attr("src",otf._obj.src);
	$("#iditem").val(otf._obj.id)
	for(var k in currLayout.objs){
		var ob=currLayout.objs[k];
		$('#'+ob.id).css("background-color","#FFF");
	}
	$('#'+cual).css("background-color","#F60");
	selectProps();
}

function linktoObj(){
	//vincula el objeto creado al vuelo con el objeto Obj, respectivo el cual tendrá todas las propiedades.
	for(var g in objOnthefly){
		var otf=objOnthefly[g];
		for(var ji in currLayout.objs){
			if(otf.name==currLayout.objs[ji].id){
				otf._obj=currLayout.objs[ji];
				currLayout.objs[ji].objeto=otf;
				currLayout.objs[ji].zindex=otf._zindex;
			}
		}
	}
}
