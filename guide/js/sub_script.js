$(function () {
	$(".top>a").click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});
	$(window).scroll(function () {
		var height = $(window).scrollTop();
		if (height > 100) {
			$('.top').fadeIn();
		} else {
			$('.top').fadeOut();
		}
	});
});



// <!-- Initialize Swiper -->
var swiper = new Swiper(".mySwiper", {
	// 기본 설정
	loop: true, // 슬라이드 무한 반복 (권장)

	// 자동 재생 설정
	autoplay: {
		delay: 2500, // 2.5초마다 전환
		disableOnInteraction: false, // 사용자 제어(드래그 등) 후에도 자동 재생 유지
	},
	pagination: {
		el: ".swiper-pagination",
		dynamicBullets: true,
	},
});