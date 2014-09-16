
window.layouts=window.layouts||{};
window._escenafn=window._escenafn||{};
//require(["scenes/"+"test1"+"/layout.js"],function(){  });

window._escenafn["test1"]=function(escena){
	escena.name="test1";
	currLayout=currLayout|| new Layaut();
	escena.loadLayout(window.layouts["test1"]);

	/************ CODE:  **************/
	//alert("cargó");


	/*********** END CODE *************/
}

sc(window._escenafn["test1"]);
