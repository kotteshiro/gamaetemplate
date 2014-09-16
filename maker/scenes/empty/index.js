var ESCNAME="empty";
window.layouts=window.layouts||{};
require(["scenes/"+ESCNAME+"/layout.js"],function(){sc(escn);});


var escn=function(escena){
	escena.name=ESCNAME;
	currLayout=currLayout|| new Layaut();
	currLayout.load(window.layouts[ESCNAME])
	//escena.loadLayout(window.layouts[ESCNAME]);

	/************ CODE:  **************/
	//alert("cargó");


	/*********** END CODE *************/
}
