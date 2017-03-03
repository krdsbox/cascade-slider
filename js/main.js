$(document).ready(function () {
	var cSwiper = new Swiper ('.contentSwipper ', {
		direction: 'horizontal',
		spaceBetween: 0,
		slidesPerView: 'auto',
		watchSlidesProgress: true,
		centeredSlides: true,
		loop: true,
		onProgress: function(swiper, progress){
			for (var i = 0; i < swiper.slides.length; i++){
				var slide = swiper.slides[i];
				progress = slide.progress;

				if(progress < 0)
					progress = progress + 1;
				else
					progress = 1 - progress;

				$(slide).css('opacity', progress);
			}
		}
	})
	var iSwiper = new Swiper ('.imageSwipper ', {
		direction: 'horizontal',
		loop: true,
		watchSlidesProgress: true,
		preloadImages: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		centeredSlides: true,
		nextButton: '.btnNext',
		prevButton: '.btnPrev',
		onInit : function(swiper) {
			swipeUpdate(swiper);
		},
		onSlideChangeStart: function() {
			$('.imageSwipper .swiper-slide').css('transition', 'transform 0.3s')
		},
		onSlideChangeEnd: function() {
			$('.imageSwipper .swiper-slide').css('transition', 'inherit')
		},
		onProgress: function(swiper, progress){
			for (var i = 0; i < swiper.slides.length; i++){
				var translate, slide = swiper.slides[i];
				progress = slide.progress;
				cProg = Math.floor(progress);

				if(cProg%2 == 0) {
					translate = Math.round((progress-cProg)*76);
				}
				else {
					translate = Math.round(76 - ((progress-cProg)*76));
				}

				$(slide).css({
					transform: 'translate3d(0,' + translate + '%,0)' 
				});
			}
		}
	})  

	iSwiper.params.control = cSwiper;
	cSwiper.params.control = iSwiper;

	$(window).on('resize', function() {
		swipeUpdate(iSwiper);
		cSwiper.update();
	})
})  
function swipeUpdate(e) {
	var pWidth = $(e.slides[1]).find('div').width(),
	sWidth = $(e.slides[0]).width(),
	fWidth = -(pWidth - sWidth)/2;

	e.params.spaceBetween = Math.round(fWidth);

	$('i.bgElem').css('width', Math.round(sWidth));

	e.update();

	e.slideTo(e.activeIndex);
}
