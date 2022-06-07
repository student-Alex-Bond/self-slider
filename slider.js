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
let arraySlides = []
const countImg = slides.length - 1

function templateImg(img, position) {
	return `<img class="slides__slide" src="${img}" style="left: ${position + 'px'}">`
}

function renderSlides(positionInHTML, arrayImg) {
	let html = arrayImg.join(' ')
	document.querySelector('.slides__container').insertAdjacentHTML(positionInHTML, html)
}

function addImg(index = 0, position = 0) {
if(index === slides.length){
	index = 0
}
	arraySlides.push(templateImg(sliderSrcImg[index], position))
}

function firstRender() {
	addImg(countImg, -widthSlide)
	renderSlides('afterbegin', arraySlides)
	arraySlides = []
	addImg(0, '0')
	renderSlides('beforeend', arraySlides)
	arraySlides = []
	addImg(currentIndex + 1, widthSlide)
	renderSlides('beforeend', arraySlides)
	arraySlides = []

}

function nextImg() {
	console.log(currentIndex)
	if(currentIndex === countImg){
		currentIndex = 0
	}

	addImg(currentIndex+1, widthSlide)
	currentIndex++
	console.log('before: ', currentIndex)
}

function previousImg() {
	console.log(currentIndex)
	if (currentIndex === 0) {
		currentIndex = countImg
	} else {
		currentIndex--
	}
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
		}
		if (direction === 'back') {
			showSlides[countImg].remove()
			renderSlides('afterbegin', arraySlides)
		}

		arraySlides = []
		button.disabled = false
	}, timeout)

}

function activeDot(step) {
	dots.forEach(dot => dot.classList.remove('slider__dots-circle--active'))

	dots[step].classList.add('slider__dots-circle--active')

}

firstRender()


buttonRight.addEventListener('click', () => {
	changeSlide(buttonRight, 'forward')
})
buttonLeft.addEventListener('click', () => {
	changeSlide(buttonLeft, 'back')
})


