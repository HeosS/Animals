;( function( $, window, undefined ) {

	'use strict';
	
	var Modernizr = window.Modernizr;
	var buena = 0;
	var mala = 0;
	$.CBPFWSlider = function( options, element ) {
		this.$el = $( element );
		this._init( options );
	};
	$.CBPFWSlider.defaults = {
		speed : 800,
		easing : 'ease-in-out',
	};
	$.CBPFWSlider.prototype = {
		_init : function( options ) {
			this.options = $.extend( true, {}, $.CBPFWSlider.defaults, options );
			this.$el.css('perspective', this.options.perspective);
			this._config();
			this._initEvents();

		},
		_config : function() {
			this.$list = this.$el.children('ul');
			this.$items = this.$list.children('li');
			this.$actividades = this.$items.children('.actividad');
			this.itemsCount = this.$items.length;
			this.actividadCount = this.$actividades.length;
			this.support = Modernizr.csstransitions && Modernizr.csstransforms;
			this.support3d = Modernizr.csstransforms3d;
			var transEndEventNames = {
					'WebkitTransition' : 'webkitTransitionEnd',
					'MozTransition' : 'transitionend',
					'OTransition' : 'oTransitionEnd',
					'msTransition' : 'MSTransitionEnd',
					'transition' : 'transitionend'
				},
				transformNames = {
					'WebkitTransform' : '-webkit-transform',
					'MozTransform' : '-moz-transform',
					'OTransform' : '-o-transform',
					'msTransform' : '-ms-transform',
					'transform' : 'transform'
				};
			if( this.support ) {
				this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.cbpFWSlider';
				this.transformName = transformNames[ Modernizr.prefixed( 'transform' ) ];
			}
			this.current = 0;
			this.old = 0;
			this.isAnimating = false;
			this.$list.css( 'width', 100 * this.itemsCount + '%' );
			if( this.support ) {
				this.$list.css( 'transition', this.transformName + ' ' + this.options.speed + 'ms ' + this.options.easing );
			}
			this.$items.css( 'width', 100 / this.itemsCount + '%' );
			if( this.itemsCount > 1 ) {
				this.$navNext = $( '<h2 class="avanza">Avanza</h2><span class="cbp-fwnext">&gt;</span>' );
				$( '<nav/>' ).append(this.$navNext ).appendTo( this.$el );
				var dots = '';
				for( var i = 0; i < this.itemsCount; ++i ) {
					var dot = i === this.current ? '<span class="cbp-fwcurrent"></span>' : '<span></span>';
					dots += dot;
				}
				var navDots = $( '<div class="cbp-fwdots"/>' ).append( dots ).appendTo( this.$el );
				this.$navDots = navDots.children( 'span' );
			}
		},
		_initEvents : function() {
			this.$return = $('#return');
			this.$btnext = $('.btn-next');
			this.$btnextmala = $('.btn-next-mala');
			var self = this;
			if( this.itemsCount > 1 ) {
				this.$navNext.on('click.cbpFWSlider', $.proxy( this._navigate, this, 'next' ) );
				this.$return.on('click', function(){location.reload();});
				this.$btnext.on('click.cbpFWSlider', $.proxy(this._navigate,this,'next'));
				this.$btnextmala.on('click.cbpFWSlider', $.proxy(this._navigate,this,'next'));
				this.$btnext.on('click', function(){
					$('.respuesta-buena').fadeOut('slow').hide();
				});
				this.$btnextmala.on( 'click', function(){
					$('.mira-la-respuesta').fadeOut('slow').hide();
				});
			}
		},
		_actividad : function() {
			var correct = 0;
			var bad = 0;
			
			this.$respuesta1 = $('.actividad').find(".respuesta-1");
			this.$respuesta2 = $('.actividad').find(".respuesta-2");
			this.$respuesta3 = $('.actividad').find(".respuesta-3");
			this.$cuadroRespuesta1 = $('.actividad').find(".cuadro-respuesta-1");
			this.$cuadroRespuesta2 = $('.actividad').find(".cuadro-respuesta-2");
			this.$cuadroRespuesta3 = $('.actividad').find(".cuadro-respuesta-3");
			
			this.$respuesta1.data('number',1).draggable({
				disable: false,
				revert: true
			});
			this.$respuesta2.data('number',2).draggable({
				disable: false,
				revert: true
			});
			this.$respuesta3.data('number',3).draggable({
				disable: false,
				revert: true
			});
			this.$cuadroRespuesta1.data('number',1).droppable({
					disable: false,
  					drop : correcta
			});
			this.$cuadroRespuesta2.data('number',2).droppable({
					disable: false,
  					drop : correcta
			});
			this.$cuadroRespuesta3.data('number',3).droppable({
					disable: false,
  					drop : correcta
			});
			function correcta (event, ui){
				var respuesta = ui.draggable.data('number');
				var cuadro = $(this).data('number');
				
					if (respuesta == cuadro){
						ui.draggable.draggable('disable');
						$(this).droppable('disable');
						ui.draggable.position({of:$(this), my:'left top', at:'left top'});
    					ui.draggable.draggable('option', 'revert', false);
    					correct++;
					}
					if (respuesta != cuadro){
						$('.respuesta-incorrecta').fadeIn('slow').delay(2000).fadeOut('slow');
						bad++;
					}
					if (correct == 3){
						$('.respuesta-buena').fadeIn('slow').show();
						reseteo;
						buena++;
					}
					else if (bad == 2){
						$('.respuesta-incorrecta').hide();
						$('.mira-la-respuesta').fadeIn('slow').show();
						reseteo;
						mala++;
					}
			}
			function reseteo(){
				var correct = 0;
				var bad = 0;
			}
		},
		_score : function(){
			$('.resultado-buenas').append('<p>' + buena + '</p>');
			$('.resultado-malas').append('<p>' + mala + '</p>');
		},
		_fin : function(){
			$('.cbp-fwslider ul').fadeOut('slow');
			$('.fin').delay(500).fadeIn('slow');
		},
		_navigate : function( direction ) {
			if( this.isAnimating ) {
				return false;
			}
			this.isAnimating = true;
			this.old = this.current;
			if( direction === 'next' && this.current < this.itemsCount - 1 ) {
				++this.current;
			}
			else if( direction === 'previous' && this.current > 0 ) {
				--this.current;
			}
			this._slide();
			this._actividad();
		},
		_slide : function() {
			this._toggleNavControls();
			var translateVal = -1 * this.current * 100 / this.itemsCount;
			if( this.support ) {
				this.$list.css( 'transform', this.support3d ? 'translate3d(' + translateVal + '%,0,0)' : 'translate(' + translateVal + '%)' );
			}
			else {
				this.$list.css( 'margin-left', -1 * this.current * 100 + '%' );	
			}
			
			var transitionendfn = $.proxy( function() {
				this.isAnimating = false;
			}, this );
			if( this.support ) {
				this.$list.on( this.transEndEventName, $.proxy( transitionendfn, this ) );
			}
			else {
				transitionendfn.call();
			}
		},
		_toggleNavControls : function() {
			switch( this.current ) {
				case 0 : this.$navNext.show(); break;
				case this.itemsCount - 1 : this.$navNext.hide(); this._score(); this._fin(); break;
				default : this.$navNext.hide(); break;
			}
			this.$navDots.eq( this.old ).removeClass( 'cbp-fwcurrent' ).end().eq( this.current ).addClass( 'cbp-fwcurrent' );
		},
		_jump : function( position ) {
			if( position === this.current || this.isAnimating ) {
				return false;
			}
			this.isAnimating = true;
			this.old = this.current;
			this.current = position;
			this._slide();
		},
		destroy : function() {
			if( this.itemsCount > 1 ) {
				this.$navPrev.parent().remove();
				this.$navDots.parent().remove();
			}
			this.$list.css( 'width', 'auto' );
			if( this.support ) {
				this.$list.css( 'transition', 'none' );
			}
			this.$items.css( 'width', 'auto' );
		}
	};
	var logError = function( message ) {
		if ( window.console ) {
			window.console.error( message );
		}
	};
	$.fn.cbpFWSlider = function( options ) {
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				var instance = $.data( this, 'cbpFWSlider' );
				if ( !instance ) {
					logError( "cannot call methods on cbpFWSlider prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for cbpFWSlider instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		} 
		else {
			this.each(function() {	
				var instance = $.data( this, 'cbpFWSlider' );
				if ( instance ) {
					instance._init();
				}
				else {
					instance = $.data( this, 'cbpFWSlider', new $.CBPFWSlider( options, this ) );
				}
			});
		}
		return this;
	};
} )( jQuery, window );