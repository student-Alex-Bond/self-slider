const buttonLeft = document.querySelector('.arrow_left')
const buttonRight = document.querySelector('.arrow_right')
const slides = document.querySelectorAll('.slides__slide')
const dots = document.querySelectorAll('.slider__dots-item')
const widthSlide = document.querySelector('.slides__container').clientWidth;
let sliderSrcImg = []
slides.forEach((item, index) => {
	sliderSrcImg.push(item.src)
	slides[index].remove()
})
// variables
let currentIndex = 0
let arraySlides = []
const countImg = slides.length - 1

function templateImg(img, position) {
	return `<img class="slides__slide" src="${img}" style="left: ${position + 'px'}">`
}

function renderDots() {
	let length = sliderSrcImg.length
	const insertDots = Array.from({length}, (v, k) =>
		`<button class="slider__dots-item" data-id="${k}"></button>`)
	dots.forEach(dot => dot.remove())
	document.querySelector('.slider__dots').insertAdjacentHTML('afterbegin', insertDots.join(''))
}

function activeDot(activeIndex) {
	document.querySelectorAll('.slider__dots-item').forEach(dot => dot.classList.remove('slider__dots-circle--active'))
	document.querySelectorAll('.slider__dots-item')[activeIndex].classList.add('slider__dots-circle--active')

}

function renderSlides(positionInHTML, arrayImg) {
	let html = arrayImg.join(' ')
	document.querySelector('.slides__container').insertAdjacentHTML(positionInHTML, html)
}

function addImg(index = 0, position = 0) {

	if (index === slides.length) {
		index = 0
	}

	arraySlides.push(templateImg(sliderSrcImg[index], position))
}

function firstRenderSlider() {
	addImg(countImg, -widthSlide)
	renderSlides('afterbegin', arraySlides)
	arraySlides = []
	addImg(0, '0')
	renderSlides('beforeend', arraySlides)
	arraySlides = []
	addImg(currentIndex + 1, widthSlide)
	renderSlides('beforeend', arraySlides)
	arraySlides = []
	activeDot(currentIndex)
	currentIndex++
}

function nextImg() {
	addImg(currentIndex + 1, widthSlide)
}

function previousImg() {
	addImg(currentIndex, -widthSlide)
}

function changeSlide(button, direction) {

	if (direction === 'forward') {
		nextImg()
	}
	if (direction === 'back') {
		previousImg()
	}
	animateSlide(button, direction)

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
			showSlides[0].style.left = -widthSlide - timePassed / (timeout / widthSlide) + 'px'
			showSlides[1].style.left = -(timePassed) / (timeout / widthSlide) + 'px'
			showSlides[2].style.left = widthSlide - timePassed / (timeout / widthSlide) + 'px'
		}
		if (direction === 'back') {
			showSlides[0].style.left = -widthSlide + timePassed / (timeout / widthSlide) + 'px'
			showSlides[1].style.left = (timePassed) / (timeout / widthSlide) + 'px'
			showSlides[2].style.left = widthSlide + timePassed / (timeout / widthSlide) + 'px'
		}

	}, 10);

	setTimeout(function () {
		if (direction === 'forward') {
			showSlides[0].remove()
			renderSlides('beforeend', arraySlides)
			currentIndex++
			if (currentIndex === countImg + 1) {
				currentIndex = 0
			}
		}
		if (direction === 'back') {
			showSlides[countImg].remove()
			renderSlides('afterbegin', arraySlides)
			currentIndex--
			if (currentIndex === -1) {
				currentIndex = countImg
			}
			console.log(currentIndex)
		}

		arraySlides = []
		button.disabled = false
	}, timeout)

}

renderDots()
activeDot(currentIndex)
firstRenderSlider()


buttonRight.addEventListener('click', () => {
	changeSlide(buttonRight, 'forward')
})
buttonLeft.addEventListener('click', () => {
	changeSlide(buttonLeft, 'back')
})


