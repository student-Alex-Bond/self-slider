const buttonLeft = document.querySelector('.arrow_left')
const buttonRight = document.querySelector('.arrow_right')
const slides = document.querySelectorAll('.slides__slide')
const dots = document.querySelectorAll('.slider__dots-item')
const widthSlide = document.querySelector('.slides__container').clientWidth;


let slider = []
slides.forEach((item ,index) => {
	slider.push(item.src)
	slides[index].remove()
})

let step = 0
let offset = 0

function createAndAddArrayTwoImage() {
	let img = document.createElement('img')
	img.src = slider[step]
	img.classList.add('slides__slide')
	img.style.left = offset * widthSlide + 'px'
	document.querySelector('.slides__container').appendChild(img)

	if (step === slider.length - 1) {
		step = 0
	} else {
		step++
	}
	offset = 1
}

function changeSlide() {
	buttonRight.disabled = true
	let showSlides = document.querySelectorAll('.slides__slide')
	let start = Date.now();
	const timeout = 1000
	let timer = setInterval(function () {
		let timePassed = Date.now() - start;


		if (timePassed >= timeout + 7) {
			clearInterval(timer);
			return;
		}
		showSlides[0].style.left = Math.ceil(-(timePassed) / (timeout / widthSlide)) + 'px'
		showSlides[1].style.left = widthSlide - timePassed / (timeout / widthSlide) + 'px'


	}, 10);
	setTimeout(function () {
		showSlides[0].remove()
		createAndAddArrayTwoImage()
		buttonRight.disabled = false
		activeDot(step)

	}, timeout)
}

function activeDot(step) {
	if (step === slider.length - 1) {
		dots[step].classList.remove('slider__dots-circle--active')
		dots[0].classList.add('slider__dots-circle--active')
	} else {
		dots[step].classList.remove('slider__dots-circle--active')
		dots[step + 1].classList.add('slider__dots-circle--active')
	}


}

createAndAddArrayTwoImage()
createAndAddArrayTwoImage()

buttonRight.addEventListener('click', () => {
	changeSlide()
})
buttonLeft.addEventListener('click', () => {
	changeSlide()
})

