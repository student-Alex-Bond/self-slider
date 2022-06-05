const buttonLeft = document.querySelector('.arrow_left')
const buttonRight = document.querySelector('.arrow_right')
const slides = document.querySelectorAll('.slides__slide')
const dots = document.querySelectorAll('.slider__dots-item')
const widthSlide = document.querySelector('.slides__container').clientWidth;
//const dots_container = document.querySelector('.slider__dots')
let sliderSrcImg = []
slides.forEach((item, index) => {
	sliderSrcImg.push(item.src)
	slides[index].remove()
})
// variables
let currentIndex = 0
let arrayTwoImg = []

function templateImg(img, position) {
	return `<img class="slides__slide" src="${img}" style="left:${position}">`
}

function renderSlides(arrayImg) {
	let html = arrayImg.map(img => img).join(' ')
	document.querySelector('.slides__container').insertAdjacentHTML("afterbegin", html)
}

function fillArrayImage() {
	if (arrayTwoImg.length === 0) {
		for (let i = 0; i < sliderSrcImg.length - 1; i++) {
			let left = i * widthSlide + 'px'
			arrayTwoImg.push(templateImg(sliderSrcImg[i], left))
		}
	}
	renderSlides(arrayTwoImg)
}

function changeSlide(direction) {

	if (direction === 'forward') {


	}
	if (direction === 'back') {

	}

	fillArrayImage()
}

function animateSlide(button, direction) {
	button.disabled = true
	let showSlides = document.querySelectorAll('.slides__slide')
	let start = Date.now();
	const timeout = 1000
	let timer = setInterval(function () {
		let timePassed = Date.now() - start;

		if (timePassed >= timeout + 7) {
			clearInterval(timer);
			return;
		}
		if (direction === 'forward') {
			showSlides[0].style.left = -(timePassed) / (timeout / widthSlide) + 'px'
			showSlides[1].style.left = widthSlide - timePassed / (timeout / widthSlide) + 'px'
		}
		if (direction === 'back') {

		}


	}, 10);
	setTimeout(function () {
		showSlides.forEach(item => item.remove())
		if (direction === 'forward') {
			changeSlide(direction)
		}
		if (direction === 'back') {
			changeSlide(direction)
		}
		button.disabled = false


	}, timeout)
}

function activeDot(step) {
	dots.forEach(dot => dot.classList.remove('slider__dots-circle--active'))

	dots[step].classList.add('slider__dots-circle--active')

}

fillArrayImage()


buttonRight.addEventListener('click', () => {
	animateSlide(buttonRight, 'forward')
})
buttonLeft.addEventListener('click', () => {
	animateSlide(buttonLeft, 'back')
})

// dots_container.addEventListener('click', (event) => {
// 	changeDots(event)
// })

