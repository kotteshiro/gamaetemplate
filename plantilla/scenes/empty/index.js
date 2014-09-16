var ESCNAME="empty";
window.layouts=window.layouts||{};
window._escenafn=window._escenafn||{};
//require(["scenes/"+"empty"+"/layout.js"],function(a,b){ sc(window._escenafn["empty"]); });

window._escenafn["empty"]=function(escena){
	console.log("cargando escena function","empty");
	escena.name="empty";
	currLayout=currLayout|| new Layaut();
	escena.loadLayout(window.layouts["empty"]);

	/************ CODE:  **************/
	//alert("cargó");


	/*********** END CODE *************/
}

sc(window._escenafn["empty"]);
