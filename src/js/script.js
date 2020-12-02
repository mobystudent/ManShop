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

		const priceArr = $('.item__count-price').map((i, item) => {
			const id = $(item).data().price;

			return {
				id: parseInt(id),
				num: i+1
			}
		});
		let sortPriceArr;

		if ($(e.currentTarget).data().value == 'up') {
			sortPriceArr = priceArr.sort((a, b) => a.id > b.id ? 1 : -1);
		} else if ($(e.currentTarget).data().value == 'down') {
			sortPriceArr = priceArr.sort((a, b) => a.id < b.id ? 1 : -1);
		}

		showSortItems(sortPriceArr);
	});
}

function showSortItems(pricies) {
	[...pricies].map((item, i) => $(`.item:nth-child(${item.num})`).css('order', i + 1));
}

function filterCategoryItems() {
	$('.aside__link').click(e => {
		const filterCategory = $(e.currentTarget).data('category');

		$('.item').hide();
		$('.item__category').map((i, item) => {
			const itemCategory = $(item).data('category');

			if (filterCategory == itemCategory) {
				$(item).closest('.item').show();
			} else if (filterCategory == 'all') {
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
			anNavFor: '.slider--single'
		});

		$(item).find('.slider--single').slick({
			infinite: false,
			easing: 'ease-in',
			speed: 300,
			anNavFor: '.slider__content'
		});
	})
}
