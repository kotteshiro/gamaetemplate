var ESCNAME="test";
window.layouts=window.layouts||{};
window._escenafn=window._escenafn||{};


window._escenafn["test"]=function(escena){
	escena.name="test";
	currLayout=currLayout|| new Layaut();
	escena.loadLayout(window.layouts["test"]);

	/************ CODE:  **************/
	//alert("cargó");


	/*********** END CODE *************/
}
//require(["scenes/"+"test"+"/layout.js"],function(){  sc(window._escenafn["test"]); });
sc(window._escenafn["test"]);
