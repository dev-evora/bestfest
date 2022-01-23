/*
 *
 *
 * MAIN
 * 
 * 
 */

$(function () {

	init()
	initSliders()

	$('[data-fancybox]').fancybox({
		touch: false,
		autoFocus: false,
		backFocus: false,
		closeExisting: true
	});

	$('.header-burger .burger, .header-burger p').click(function () {
		$('.burger').toggleClass('active');
	});

	$('.favorites-tabs li[data-id=1], .favorites-tab[data-id=1]').addClass("active");

	$('.favorites-tabs li').click(function () {
		let id = $(this).data('id');

		$('.favorites-tabs li').removeClass('active');
		$(this).addClass('active');

		$(".favorites-tab").removeClass("active");
		$(".favorites-tab[data-id=" + id + "]").addClass("active");
	});

	$('.item-like').click(function () {
		$(this).toggleClass('active');
	});

	$('.item-constructor').click(function () {
		$(this).toggleClass('active');
	});

	$('.catalog-sidebar__title-toggle').click(function(){
		$('+ .catalog-sidebar__content', this).slideToggle();
		$(this).parent().toggleClass('open');
	});

	if($('.catalog-sidebar__item').hasClass('open')){
		$('.catalog-sidebar__item.open .catalog-sidebar__content').show();
	}

	$('.catalog-sidebar__reset').click(function(){
		$('.catalog-sidebar')[0].reset();
	});

	$('.lk-order').click(function(){
		$(this).toggleClass('open')
		$('> .lk-order__content', this).slideToggle()
	})

	$('.lk-order').first().trigger('click')

	$('.order-checkbox-pass input').change(function(){
		if($(this).is(':checked')){
			$('.order-label-pass').css('display', 'block')
			$('.order-label-pass .order-input').prop('required', true)
		}else{
			$('.order-label-pass').css('display', 'none')
			$('.order-label-pass .order-input').prop('required', false)
		}
	})

	$('.order-label-date').click(function(){
		$('> p', this).hide()
	})

	scroll('.card-second__content')
	scroll('.order-second-scroll')

	$('.builder-dishes__list li').click(function(){
		$('.builder-dishes__list li').removeClass('active')
		$(this).addClass('active')
		$('.builder-selected-title').text($(this).text())
	})

	$('.builder-dishes__list li').first().trigger('click')

	$('.builder-service__list li').click(function(){
		$('.builder-service__list li').removeClass('active')
		$(this).addClass('active')
	})

	$('.builder-service__list li').first().trigger('click')
	
});

/*
 *
 *
 * FUNCTION
 * 
 * 
 */

const init = () => {
	maskPhone()
	gridMenu()
	catalogTags()
	countItem()
	changeTotal()
	getSum()
}

// при вставке карточек в DOM запускай reloadItem
const reloadItem = () => {
	itemSlider()
	countItem()
}

const maskPhone = () => {

	let maskedElements = [],
		el = document.querySelectorAll(".masked");

	if (el.length > 0) {
		const mask = {
			mask: "+7 (000) 000-00-00"
		};
		el.forEach(item => {
			maskedElements.push(new IMask(item, mask));
		});
	}

	$('.masked').click(function () {
		if ($(this).val() == '') $(this).val('+7 ');
	});

}

const gridMenu = () => {

	let index = 0,
			size = 5,
			wrap;

	if ($('.menu-item').length) {
		$('.menu-item').each(function () {
			if (index % size == 0) wrap = $('<ul class="menu-section"></ul>');
			wrap.append($(this));
			$('.menu-list').append(wrap);
			index++;
		});
	}

}

const countItem = () => {
	$('.item-count').each(function (i, item) {
		let count = parseInt($('> .item-count__number', item).val());
		$('> .item-count__minus', item).click(function () {
			if (count == 0) return;
			count--;
			$('> .item-count__number', item).val(count);
		});
		$('> .item-count__plus', item).click(function () {
			count++;
			$('> .item-count__number', item).val(count);
		});
	});
}

const triplets = (str) => {
	return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\u202f');
}

const totalPrice = (price, man) => {
	return price * man
}

const changeTotal = () => {
	let current = parseInt($('.current-price').text()),
			person = parseInt($('input[name=person]:checked').val())
	
	$('.total-price').text(triplets(totalPrice(current, person)))
	$('.current-price').text(triplets(current))

	$('input[name=person]').change(function(){
		person = parseInt($('input[name=person]:checked').val())
		$('.total-price').text(triplets(totalPrice(current, person)))
	})
}

const getSum = () => {

	if($('.total-kg').length){
		const sumGr = [],
					sumMl = []

		$('.gr').each(function(){
			let gr = parseInt($(this).text())
			sumGr.push(gr)
		});

		$('.ml').each(function(){
			let ml = parseInt($(this).text())
			sumMl.push(ml)
		});

		const sumGrArr = sumGr.reduce((a, b) => a + b)
		const sumMlArr = sumMl.reduce((a, b) => a + b)
		
		$('.total-kg span').text(sumGrArr / 1000)
		$('.total-ml span').text(sumMlArr)
	}

}

const scroll = (el) => {
	if($(el).length) {
		$(el).overlayScrollbars({
			className       : "os-theme-round-dark",
			sizeAutoCapable : true,
			paddingAbsolute : true,
		})
	}
}

/*
 * CATALOG TAGS
 */

let checkedTags = [] // checkedTags - массив тэгов [1, 2, 3...], доступен в любом месте

const updateTags = () => {
	checkedTags = []
	$('.catalog-tags li[data-tag].active').each(function(){
		checkedTags.push($(this).data('tag'))
	})
}

const catalogTags = () => {

	$('.catalog-tags li').click(function(){
		$(this).toggleClass('active')
		updateTags()
	})

	$('.catalog-tags li[data-all]').click(function(){
		if(!$(this).hasClass('active')){
			$('.catalog-tags li').removeClass('active')
		}else{
			$('.catalog-tags li').addClass('active')
		}
		updateTags()
	})

}

/*
 *
 *
 * SLIDERS
 * 
 * 
 */

const initSliders = () => {
	actionSlider()
	cateringSlider()
	anyKitchenSlider()
	clientSlider()
	reasonEventSlider()
	catalogActionSlider()
	itemSlider()
	cardPhotoSlider()
}

const slideCounter = (slider, count) => {

	let total = slider.slides.length;
	$('> .all', count).text(total);

	slider.on('transitionStart', (instance) => {
		let current = (instance.activeIndex) + 1;
		$('> .this', count).text(current);
	});

}

const actionSlider = () => {

	if($('.action-slider').length) {

		let thumbs = new Swiper('.action-thumbs', {
			loop: true,
			slidesPerView: 3,
			spaceBetween: 20,
			observer: true,
			observeParents: true,
			watchSlidesProgress: true,
			slideToClickedSlide: true,
			navigation: {
				nextEl: ".action-next",
			},
			pagination: {
				el: ".action-dots",
				clickable: true,
			},
		})

		let main = new Swiper('.action-slider', {
			loop: true,
			observer: true,
			observeParents: true,
			navigation: {
				nextEl: ".action-next",
			},
			pagination: {
				el: ".action-dots",
				clickable: true,
			},
			thumbs: {
				swiper: thumbs,
			},
		})

		console.log('init swiper')
	
	}

}

const cateringSlider = () => {

	if($('.catering-format__wrap').length) {

		let main = new Swiper('.catering-format__wrap', {
			slidesPerView: 1,
			spaceBetween: 30,
			observer: true,
			observeParents: true,
			navigation: {
				nextEl: ".catering-format__arrow-next",
				prevEl: ".catering-format__arrow-prev",
			}
		})

		slideCounter(main, '.catering-format__count')

		console.log('init swiper')
		
	}

}

const anyKitchenSlider = () => {

	if($('.any-kitchen__slider').length) {

		let main = new Swiper('.any-kitchen__slider', {
			effect: 'fade',
			loop: true,
			observer: true,
			observeParents: true,
			navigation: {
				nextEl: ".any-kitchen__next",
			},
			pagination: {
				el: ".any-kitchen__dots",
				clickable: true,
			},
		})

		console.log('init swiper')
		
	}

}

const clientSlider = () => {

	if($('.client-slider').length) {

		let main = new Swiper('.client-slider', {
			slidesPerView: 6,
			spaceBetween: 10,
			// lazy: true,
			loop: true,
			observer: true,
			observeParents: true,
			navigation: {
				nextEl: ".client-arrow__next",
				prevEl: ".client-arrow__prev",
			},
		})

		console.log('init swiper')
		
	}

}

const reasonEventSlider = () => {

	if($('.reason-event__slider').length) {

		let main = new Swiper('.reason-event__slider', {
			effect: 'fade',
			observer: true,
			observeParents: true,
			navigation: {
				nextEl: ".reason-event__arrow-next",
				prevEl: ".reason-event__arrow-prev",
			},
		})

		slideCounter(main, '.reason-event__count')

		console.log('init swiper')

	}

}

const catalogActionSlider = () => {

	if($('.catalog-action').length) {

		let main = new Swiper('.catalog-action', {
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 20,
			navigation: {
				prevEl: ".catalog-action__arrow-prev",
				nextEl: ".catalog-action__arrow-next",
			},
		})

		console.log('init swiper')

	}

}

const itemSlider = () => {

	if($('.item-slider').length) {

		$('.item').each(function(i, item){

			$('.item-slider, .item-thumbs', item).attr('data-slider', i)

			let thumbs = new Swiper('.item-thumbs[data-slider="'+i+'"]', {
				slidesPerView: 4,
				spaceBetween: 10,
				observer: true,
				observeParents: true,
				watchSlidesProgress: true,
				slideToClickedSlide: true,
			})
	
			let main = new Swiper('.item-slider[data-slider="'+i+'"]', {
				observer: true,
				observeParents: true,
				thumbs: {
					swiper: thumbs,
				},
			})

		})

		console.log('init swiper')
	
	}

}

const cardPhotoSlider = () => {

	if($('.card-photo-slider').length) {

		let main = new Swiper('.card-photo-slider', {
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			observer: true,
			observeParents: true,
		})

		console.log('init swiper')
		
	}

}