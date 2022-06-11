const sliderContainer = document.querySelector('.slides__container')
const slides = document.querySelectorAll('.slides__slide')
const dotsContainer = document.querySelector('.slider__dots')
const buttonRight = document.querySelector('.arrow_right')
const buttonLeft = document.querySelector('.arrow_left')
//variables
let currentIndex = 0
const countSlides = slides.length - 1
let index = slides.length
const activeDot = (index) => {
	const dots = document.querySelectorAll('.slider__dots-item')
	dots.forEach(item => item.classList.remove('slider__dots-circle--active'))
	dots[index].classList.add('slider__dots-circle--active')

}
const toggleActiveDot = (event) => {
	let id = event.target.dataset.id
	if (id) {
		activeDot(+id)
	}
}

const renderDots = () => {
	dotsContainer.innerHTML = ''
	const arrayButtons = []
	for (let i = 1; i <= slides.length; i++) {
		arrayButtons.push(`<button class="slider__dots-item" data-id="${i}"></button>`)
	}
	dotsContainer.insertAdjacentHTML('afterbegin', arrayButtons.join(''))
	activeDot(currentIndex)
}
const animate = (direction) => {
	const slides = document.querySelectorAll('.slides__slide')
	let start = Date.now();
	let timer = setInterval(function () {

		let timePassed = Date.now() - start;

		if (timePassed >= 2000) {
			clearInterval(timer); // finish the animation after 2 seconds
			return;
		}
		if(direction === 'forward'){
			slides[slides.length - 2].style.left = `${Math.ceil(-(timePassed / 19.8))}%`
			slides[slides.length - 1].style.left = `${Math.ceil(100 - (timePassed / 19.8))}%`
		} else {
			slides[slides.length - 2].style.left = `${Math.ceil((timePassed / 19.8))}%`
			slides[slides.length - 1].style.left = `${Math.ceil(-100 + (timePassed / 19.8))}%`
		}

	}, 20);
}
const nextSlide = () => {
	const firstImg = 0
	let slides = document.querySelectorAll('.slides__slide')
	slides[firstImg].style.left = '100%'
	sliderContainer.appendChild(slides[firstImg])
	animate('forward')
	let timerID = setTimeout(() => {
		if (timerID >= 2000) {
			clearTimeout(timerID)
			return
		}
		document.querySelectorAll('.slides__slide').forEach(item => item.style = '')
		console.log(currentIndex)
	}, 2000)
}
const previousSlide = () => {
	let slides = document.querySelectorAll('.slides__slide')
	slides[slides.length - 2].style.left = '-100%'
	sliderContainer.appendChild(slides[slides.length - 2])
	animate('back')
	let timerID = setTimeout(() => {
//debugger
		if (timerID >= 2000) {
			clearTimeout(timerID)
			return
		}

		const firstElement = document.querySelector('.slides__container').firstElementChild
		const moveSlide = document.querySelectorAll('.slides__slide')[slides.length - 2]
		document.querySelector('.slides__container').insertBefore(moveSlide, firstElement)
		document.querySelectorAll('.slides__slide').forEach(item => item.style = '')
		console.log(currentIndex)
	}, 2000)
}
console.log(currentIndex)
renderDots()

//listeners
dotsContainer.addEventListener('click', () => toggleActiveDot(event))
buttonRight.addEventListener('click', () => nextSlide())
buttonLeft.addEventListener('click', () => previousSlide())