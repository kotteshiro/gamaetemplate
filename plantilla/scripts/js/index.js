console.log("file:","index.js");
require([
		"scripts/js/own/core.js",
		"scripts/js/own/preloader.js",
		"scripts/js/libs/timer.min.js",
		"scripts/js/libs/countdown.min.js",
		"scripts/js/libs/soundjs-0.5.2.min.js",
		],
		function(){
			cboni(_cfg.scenes.length+1,"niqa",loadedescenes);
			require(	[
							"scripts/js/libs/caat/caat.js",
							"scripts/js/main.js"
						],
						function(){ 
							require(["scripts/js/own/caattemplate.js"],
									function(){
										cbont("niqa");
									}); 
						}
					);

			//**** CARGA ESCENAS ****//
			
			for(var g in _cfg.scenes){
				require(	["scenes/"+_cfg.scenes[g]+"/index.js",
							 "scenes/"+_cfg.scenes[g]+"/assets.js"],
							 function(){
								cbont("niqa");
								subtmitfiles(_images_,"scenes/"+_cfg.scenes[g]+"/");
							 }
						);
			}
			
		}
);

function loadedescenes(){
	console.log("AWAWAWAWAWAWAWA");
	require(
			["scripts/js/own/sonido2.js"],
			function(){
				sonido.init();
			}
		);
	_onLoad();
}