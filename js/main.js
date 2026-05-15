/* ===================================
--------------------------------------
  NISSA - PHOTOGRAPHY STUDIO TEMPLATE
  Version: 1.0
 -------------------------------------
 =====================================*/


'use strict';

// video

$(document).ready(function () {
	var video = document.getElementById('intro-video');
	var wrapper = document.getElementById('intro-video-wrapper');

	// 페이지를 보여주는 통합 함수
	function revealPage() {
		if ($("#intro-video-wrapper").length === 0) return;

		// 1. 영상 레이어에 fade-out 클래스 추가 (CSS의 2s 애니메이션 시작)
		$("#intro-video-wrapper").addClass('fade-out');

		// 2. 동시에 밑에 깔린 기존 프리로더도 천천히 투명해지게 설정
		$(".loader").fadeOut();
		$("#preloder").fadeOut(500); // 0.4s(slow)에서 2s(2000ms)로 변경

		// 3. 애니메이션이 완전히 끝난 뒤에 요소를 삭제 (2초 이상 여유를 둠)
		setTimeout(function () {
			$("#intro-video-wrapper").remove();
			$("#preloder").remove();
		}, 1500);
	}

	if (video) {
		// 1. 영상 재생 시도
		var playPromise = video.play();

		if (playPromise !== undefined) {
			playPromise.then(function () {
				// 재생 성공 시: 영상이 끝나면 페이지 노출
				video.onended = function () {
					revealPage();
				};
			}).catch(function (error) {
				// 재생 실패 시 (자동재생 차단 등): 즉시 페이지 노출
				console.log("Video play failed, revealing page immediately.");
				revealPage();
			});
		}
	} else {
		// 영상 태그가 없으면 즉시 노출
		revealPage();
	}

	// [안전장치] 영상이 로드되지 않더라도 4초 뒤에는 무조건 페이지 노출
	setTimeout(function () {
		revealPage();
	}, 6000);
});



$(window).on('load', function () {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

});

(function ($) {
	/*------------------
		Navigation
	--------------------*/
	$('.nav-switch').on('click', function () {
		$('.main-site-warp').addClass('push-side');
		$('body').addClass('push-side');
		setTimeout(function () {
			hero_section();
		}, 400)

	});
	$('.close-menu').on('click', function () {
		$('.main-site-warp').removeClass('push-side');
		setTimeout(function () {
			$('body').removeClass('push-side');
		}, 400);
	});


	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function () {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});


	/*------------------
	   Custom Scrollbar
	--------------------*/
	function site_scrollbar() {

		if ($(window).width() > 991) {
			$(".main-sidebar").niceScroll({
				cursorborder: "",
				cursorcolor: "#f1f1f1",
				boxzoom: false,
				cursorwidth: 4,
				cursorborderradius: 0,
			});

			$(".about-section, .contact-section, .elements-section").niceScroll({
				cursorborder: "",
				cursorcolor: "#f1f1f1",
				boxzoom: false,
				cursorwidth: 4,
				cursorborderradius: 0,
			});

			$(".blog-posts").niceScroll({
				cursorborder: "",
				cursorcolor: "#242424",
				boxzoom: false,
				cursorwidth: 4,
				autohidemode: true,
				background: '#eeeeee',
				railoffset: { top: 50, right: 0, left: 40, bottom: 0 },
				railpadding: { top: 0, right: 0, left: 0, bottom: 100 },
			});

			$(".portfolio-section").niceScroll({
				cursorborder: "",
				cursorcolor: "#242424",
				boxzoom: false,
				cursorwidth: 4,
				autohidemode: true,
				background: '#eeeeee',
				railoffset: { top: 50, right: 0, left: -14, bottom: 0 },
				railpadding: { top: 0, right: 0, left: 0, bottom: 100 },
			});
		}

	}
	site_scrollbar();


	/*------------------
		Video Popup
	--------------------*/
	$('.video-popup').magnificPopup({
		type: 'iframe'
	});

	/*------------------
		Hero section
	--------------------*/
	function hero_section() {
		if ($(window).width() > 768) {

			var ps_w = $('.page-section').innerWidth();
			$('.hs-item').width(ps_w / 2);
			var trackW = (($('.hs-item').width()) * $('.hs-item').length) + ($('.hs-item').length * 50);
			$('.hero-track').width(trackW);

			var hs_width = $(window).innerHeight() - 170;
			$('.hs-item').height(hs_width);

			$(".hero-scroll").niceScroll({
				cursorborder: "",
				cursorcolor: "#242424",
				boxzoom: false,
				cursorwidth: 4,
				autohidemode: false,
				background: '#eeeeee',
				cursorborderradius: 0,
				railoffset: { top: 0, right: 50, left: 0, bottom: 0 },
				railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
			});
		}
		if ($(window).width() < 768) {
			$('.hero-track').addClass('owl-carousel')
			$('.hero-track').owlCarousel({
				loop: true,
				margin: 0,
				nav: true,
				items: 1,
				dots: false,
				margin: 30,
				navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
			});
		}
	}

	hero_section();

	$(window).resize(function () {
		hero_section();
		site_scrollbar();
	});


	/*------------------
		Accordions
	--------------------*/
	$('.panel-link').on('click', function (e) {
		$('.panel-link').parent('.panel-header').removeClass('active');
		var $this = $(this).parent('.panel-header');
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		e.preventDefault();
	});

	/*------------------
		Progress Bar
	--------------------*/
	$('.progress-bar-style').each(function () {
		var progress = $(this).data("progress");
		var prog_width = progress + '%';
		if (progress <= 100) {
			$(this).append('<div class="bar-inner" style="width:' + prog_width + '"><span>' + prog_width + '</span></div>');
		}
		else {
			$(this).append('<div class="bar-inner" style="width:100%"><span>' + prog_width + '</span></div>');
		}
	});

	/*------------------
		Circle progress
	--------------------*/
	$('.circle-progress').each(function () {
		var cpvalue = $(this).data("cpvalue");
		var cpcolor = $(this).data("cpcolor");
		var cpid = $(this).data("cpid");

		$(this).prepend('<div class="' + cpid + ' circle-warp"></div><h2>' + cpvalue + '<span>%</span></h2>');

		if (cpvalue < 100) {

			$('.' + cpid).circleProgress({
				value: '0.' + cpvalue,
				size: 84,
				thickness: 5,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		} else {
			$('.' + cpid).circleProgress({
				value: 1,
				size: 84,
				thickness: 5,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		}
	});

})(jQuery);

