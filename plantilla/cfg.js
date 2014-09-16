console.log("file:","cfg.js");
var _cfg={
	title: "titulito",
	scenes:["test1","empty","test"], //la primera es la principal(inicial)
	assets:{ //Generales, que no son exclusivos de la escena pe: puntero, sonido evento, fondo, etc.
		sound:[
			{id:'COMENZAR',     					url:"res/sound/COMENZAR.mp3"					},
			{id:'CONTROLES',     					url:"res/sound/CONTROLES.mp3"				},
			{id:'ELEMENTO',    						url:"res/sound/ELEMENTO.mp3"					},
			{id:'ESTRELLA',     					url:"res/sound/ESTRELLA.mp3"					},
			{id:'EXCELENTE',     					url:"res/sound/EXCELENTE.mp3"				},
			{id:'FALLIDO',     						url:"res/sound/INTENTO_FALLIDO.mp3"			},
			{id:'PASAR-NIVEL',     					url:"res/sound/PASAR_NIVEL.mp3"				},
			{id:'SELECCION-RELAJADO-TIEMPO',     	url:"res/sound/SELECCION_RELAJADO_TIEMPO.mp3"},
			{id:'TITULO-ABRE',     					url:"res/sound/TITULO_ABRE.mp3"				},
			{id:'TIME_OVER',     					url:"res/sound/TIME_OVER.mp3"				},
			{id:'CORRECTO',     					url:"res/sound/CORRECTO.mp3"					},
			{id:"pasar_de_nivel" ,					url:"res/sound/pasar_de_nivel.mp3"},
			{id:"animo_1" , 						url:"res/sound/animo_1.mp3"},
			{id:"animo_2" , 						url:"res/sound/animo_2.mp3"},
			{id:"reloj" , 							url:"res/sound/reloj.mp3"},
			{id:"excelente_2" , 					url:"res/sound/excelente_2.mp3"},
		],
		images:[
			{id:'fondo_a',    						url:'res/images/fondo_a.png'},
			{id:'fondo_b',    						url:'res/images/fondo_b.png'},
			{id:'fondo_c',    						url:'res/images/fondo_c.png'},
			{id:'fondo_d',    						url:'res/images/fondo_d.png'},
			{id:'logogly',    						url:'res/images/GYL.png'},
			{id:'titulo',     						url:'res/images/titulo.png'}
		]
	},
	includes:[]
}
