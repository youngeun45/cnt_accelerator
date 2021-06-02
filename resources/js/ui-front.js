$(document).ready(function(){
    popupUI();
    headUi();
    scrollItem();
    etcUi();
    tabMotion();
})

var headUi = function(){
    var $pageTitle = $('#pageTit');
        
    if($pageTitle.length > 0 && !$('body').hasClass('main')){
		var $current = $.trim($pageTitle.text());
		document.title = $current + ' | CNTTECH ACCELERATOR';			//#pageTit 가 title태그에 삽입
	}else if($('body').hasClass('main')){
        document.title = ' CNTTECH ACCELERATOR';
    }
    //gnb 오픈
    $('.btn_gnb_open').click(function(e){
        e.preventDefault();
        $('body').toggleClass('gnb_open hidden');
        if($('body').hasClass('gnb_open')){
            $('.gnb_wrap').stop().slideDown();
        }else {
            $('.gnb_wrap').stop().slideUp();
        }

    })
    //gnb 내려오기
    $(window).on('resize scroll',function(){
        var $header = $('header');
        var $scrollTop = $header.offset().top;
        
        if($scrollTop > 1){
            $header.addClass('scroll');
        }else{
            $header.removeClass('scroll');
        }
        if($(window).width() > 800){
            $('body').removeClass('gnb_open hidden');
            $('.gnb_wrap').hide();
        }
    })

    //gnb현재위치 표시
	$('#gnb a').each(function(){
		if($(this).text() == $('#pageTit').text()){
			$(this).parent('li').addClass('on')
		}
    })
    //h2 텍스트 바꾸기
    $('.title').text($pageTitle.text())
}
var etcUi = function(){
    if($('.countUp').length > 0){
        $(window).load(function(){
            $('.countUp').counterUp({
                delay:10,
                time:500
            });
        })
    }
    // $('.pf_cont ul').each(function(){
    //     if($(this).find('li').length <= 1 ){
    //         $(this).addClass('one')
    //     }
    // })
    
}
var $popSpeed = 300,
	$popEase = 'easeOutQuart',
	$popOpenBtn = '';
var popupUI = function(){
	$('.pop_open').on('click',function(e) {
		e.preventDefault();
		var $pop = $(this).attr('href');
		popOpen($pop,this);
	});
	$('.pop_close').on('click',function(e) {
		e.preventDefault();
		var $pop = $(this).closest('.pop_bg');
		popClose($pop);
	});

	$('.pop_bg').on('click',function(){
		var $pop = $(this);
		if(!$pop.hasClass('close_none')){popClose($pop);}
	}).on('click','.pop_wrap',function(e) {
		e.stopPropagation();
	});

	$(window).on('load',function(){
		$('.pop_open').each(function(){
			if($(this).hasClass('pop_load')){
				$(this).trigger('click');
			}
		});
	});
};
var popOpen = function(tar,btn){
	var $visible = $('.pop_bg:visible').size();

	if(btn != null || btn != window)$popOpenBtn = $(btn);
	if($visible > 0){
		$(tar).css('z-index','+='+$visible);
	}else{
		$('body').addClass('hidden');
	}
	$(tar).fadeIn($popSpeed,function(){
		if(btn != null)$(this).attr({'tabindex':0}).focus();
	});
	
	popPositin(tar,$popSpeed);
	$(window).on('resizeEnd',function(){
		popPositin(tar,$popSpeed);
	});
};
var popClose = function(tar){
	var $visible = $('.pop_bg:visible').size();
	if($visible == 1){
		$('body').removeClass('hidden');
	}
	$(tar).find('.pop_wrap').animate({'margin-top':0},$popSpeed,function(){
		$(this).removeAttr('style');
	});
	$(tar).fadeOut($popSpeed,function(){
		$(tar).removeAttr('style tabindex');
		if($popOpenBtn != ''){
			if($popOpenBtn != window){
				$popOpenBtn.focus();
			}
			$popOpenBtn = '';
		}
	});
};
var popPositin = function(tar,speed){
	setTimeout(function(){
		var $wrapH = $(tar).height(),
			$pop = $(tar).find('.pop_wrap'),
			$popH = $pop.outerHeight(),
			$mT = Math.max(0,($wrapH-$popH)/2);
	
		if(speed > 100){
			$pop.stop().animate({'margin-top':$mT},speed);
		}else{
			$pop.css({'margin-top':$mT});
		}
	},10);
};
//탑 버튼
var settings ={
    button		:'#btnTop',
    text		:'컨텐츠 상단으로 이동',
    min			:100,
    fadeIn		:400,
    fadeOut		:400,
    scrollSpeed :800,
    easingType  :'easeInOutExpo'
}
$('#contents').append('<a href="#" id="' + settings.button.substring(1) + '" title="' + settings.text + '">Top<span class="blind">' + settings.text + '</span></a>');
$(settings.button).on('click', function(e){
$('html, body').animate({scrollTop :0}, settings.scrollSpeed, settings.easingType);
e.preventDefault();
})
.on('mouseenter', function(){
$(settings.button).addClass('hover');
})
.on('mouseleave', function(){
$(settings.button).removeClass('hover');
});
$(window).scroll(function(){
    var position = $(window).scrollTop(),
        winH = $(window).scrollTop() + $(window).height(),
        fTop = $('footer').offset().top;
    if(position > settings.min){$(settings.button).fadeIn(settings.fadeIn);}
    else{$(settings.button).fadeOut(settings.fadeOut);}
    if (fTop < winH){
        $(settings.button).addClass('on')
    }else ($(settings.button).removeClass('on'))
    });

//스크롤 애니매이션
var scrollItem = function(){
    var $elements = $.find('*[data-animation]'),
        $window = $(window);

    if($elements.length > 0){
        $(window).on('scroll resize', checkInView);
        $(window).trigger('scroll');
    }


    function checkInView() {
        var $winHeight = $window.height(),
            $scrollTop = $window.scrollTop(),
            $winBottom = ($scrollTop + $winHeight);

        $.each($elements, function() {
            var $el = $(this),
                $elHeight = $($el).outerHeight(),
                $elTop = $($el).offset().top,
                $elBottom = ($elTop + $elHeight),
                $animationClass = $el.data('animation'),
                $delay = $el.data('delay'),
                $duration = $el.data('duration');

            if(!$el.hasClass('animated')){
                if($delay>0){
                    $el.css({
                        '-webkit-animation-delay':delay+'ms',
                        'animation-delay':delay+'ms'
                    });
                }
                if($duration>0){
                    $el.css({
                        '-webkit-animation-duration':duration+'ms',
                        'animation-duration':duration+'ms'
                    });
                }

                $el.addClass('animated');
            }

            if (($elBottom >= $scrollTop) && ($elTop <= $winBottom)) {
                $el.addClass($animationClass);
            } 
            // else {
            //     $el.removeClass($animationClass);
            // }

        });
    }
};
function tabMotion(){
    var $tab = $('.tab_motion');
	$tab.on('click','a',function(e) {
		if(!$(this).parent().hasClass('on')){
			var href = $(this).attr('href');		
			$(href).show().siblings('.tab_cont').hide();
			$(this).parent().addClass('on').siblings().removeClass('on');
		}
		e.preventDefault();
    });	
    $tab.children('li').eq(0).find('a').trigger('click');
}