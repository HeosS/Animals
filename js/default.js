var randomActividad = $("li.random").get().sort(function(){ 
	return Math.round(Math.random())-0.5;
});
$(randomActividad).appendTo(randomActividad[0].parentNode).show();
$('.ult').appendTo(randomActividad[5].parentNode).show();
		
var randomAlternativas1 = $("div.op1").get().sort(function(){ 
	return Math.round(Math.random())-0.5;
});
var randomAlternativas2 = $("div.op2").get().sort(function(){ 
	return Math.round(Math.random())-0.5;
});
var randomAlternativas3 = $("div.op3").get().sort(function(){ 
	return Math.round(Math.random())-0.5;
});
var randomAlternativas4 = $("div.op4").get().sort(function(){ 
	return Math.round(Math.random())-0.5;
});
var randomAlternativas5 = $("div.op5").get().sort(function(){ 
	return Math.round(Math.random())-0.5;
});
$(randomAlternativas1).appendTo(randomAlternativas1[0].parentNode).show();
$(randomAlternativas2).appendTo(randomAlternativas2[0].parentNode).show();
$(randomAlternativas3).appendTo(randomAlternativas3[0].parentNode).show();
$(randomAlternativas4).appendTo(randomAlternativas4[0].parentNode).show();
$(randomAlternativas5).appendTo(randomAlternativas5[0].parentNode).show();

$(document).ready(function(){
	
	startup();
	
	function startup() {
		$('.fin, .respuesta-incorrecta, .respuesta-buena, .portada, .mira-la-respuesta').hide();
		$('.container').css({opacity:"0"});
		$(function() {
    		FastClick.attach(document.body);
		});
		entrada();
	};
			
	$(window).load(function(){
		setTimeout(function() {
     		$('.preload').fadeOut(300);
     	}, 100);
		presentacion();
	});
	
	function presentacion(){
		$('.portada').fadeIn('slow');
		$('.barra').addClass('entrada');
		$('.boton').addClass('entrada-1');
	}
			
	function entrada(){
		$('#btn').on('click', function(){
        	$('.portada').fadeOut('slow');
			$('.container').delay(800).fadeIn('slow').css({opacity:"1"});	
			return false;			
		});
	};
	
	//sonido//
	$btnSonido = $('.btn'),
			
	$btnSonido.mouseover(function(){
		$('audio')[1].play();
	});
	$btnSonido.click(function(){
		$('audio')[0].play();
	});
				
	//touch//
	$('.portada').on("touchmove", false);
	$('.container').on("touchmove", false);
				
	$('span').mouseover(function(){
		$('audio')[1].play();
	});
	$('.cbp-fwnext').click(function(){
		$('audio')[0].play();
	});
	$('.cbp-fwprev').click(function(){
		$('audio')[0].play();
	});
});