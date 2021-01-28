'use strict';

import $ from 'jquery';
import slick from 'slick-carousel';

$(window).on('load', () => {
	toggleSortFilters();
	switchFiltersState();
	sortUpPrice();
	filterCategoryItems();
	slider();
});

function toggleSortFilters() {
	$('.sort__header').click(e => $(e.currentTarget).next().slideToggle());
}

function switchFiltersState() {
	$('.aside__link').click(e => {
		e.preventDefault();

		$('.aside__link').removeClass('aside__link--active');
		$(e.currentTarget).addClass('aside__link--active');
	});
}

function sortUpPrice() {
	$('.sort__link').click(e => {
		e.preventDefault();

		const price_arr = $('.item__count-price').map((i, item) => {
			const id = $(item).data().price;

			return {
				id: parseInt(id),
				num: i+1
			};
		});
		let sortPriceArr;

		if ($(e.currentTarget).data().value == 'up') {
			sortPriceArr = price_arr.sort((a, b) => a.id > b.id ? 1 : -1);
		} else if ($(e.currentTarget).data().value == 'down') {
			sortPriceArr = price_arr.sort((a, b) => a.id < b.id ? 1 : -1);
		}

		showSortItems(sortPriceArr);
	});
}

function showSortItems(pricies) {
	[...pricies].map((item, i) => $(`.item:nth-child(${item.num})`).css('order', i + 1));
}

function filterCategoryItems() {
	$('.aside__link').click(e => {
		const filter_category = $(e.currentTarget).data('category');

		$('.item').hide();
		$('.item__category').map((i, item) => {
			const item_category = $(item).data('category');

			if (filter_category == item_category) {
				$(item).closest('.item').show();
			} else if (filter_category == 'all') {
				$('.item').show();
			}
		});
	});
}

function slider() {
	$(".item").map((i, item) => {
		$(item).find('.slider__content').slick({
			infinite: false,
			slidesToShow: 5,
			easing: 'ease-in',
			speed: 300,
			prevArrow: $(item).find('.slider__arrow--prev'),
			nextArrow: $(item).find('.slider__arrow--next'),
			responsive: [
				{
					breakpoint: 1366,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 4,
					}
				}
			]
		});
	});
}
