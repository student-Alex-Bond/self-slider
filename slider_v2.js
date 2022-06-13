const sliderContainer = document.querySelector('.slides__container')
const slides = document.querySelectorAll('.slides__slide')
const dotsContainer = document.querySelector('.slider__dots')
const buttonRight = document.querySelector('.arrow_right')
const buttonLeft = document.querySelector('.arrow_left')
//variables
srcImg = []
// fill array tags img
slides.forEach(item => srcImg.push(item))
let currentIndex = slides.length - 1
// if 1 slide
if(slides.length === 1){
	let html = srcImg.map( img => `<img class="${img.className}" src="${img.src}" alt=""/>`)
	sliderContainer.insertAdjacentHTML('afterbegin',html.join(''))
}
//functions
const activeDot = (index) => {
	if (index === slides.length) {
		currentIndex = index = 0
	}
	if (index < 0) {
		currentIndex = index = slides.length - 1
	}
	const dots = document.querySelectorAll('.slider__dots-item')
	dots.forEach(item => item.classList.remove('slider__dots-circle--active'))
	dots[index].classList.add('slider__dots-circle--active')

}

const toggleActiveDot = (event) => {
	let id = event.target.dataset.id
	if (id) {
		activeDot(id - 1)
	}
}

const renderDots = () => {
	dotsContainer.innerHTML = ''
	const arrayButtons = []
	for (let i = 1; i <= srcImg.length; i++) {
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

		if (timePassed >= 1000) {
			clearInterval(timer);
			return;
		}
		if (direction === 'forward') {
			slides[slides.length - 2].style.left = `${Math.ceil(-(timePassed / 10))}%`
			slides[slides.length - 1].style.left = `${Math.ceil(100 - (timePassed / 10))}%`
		} else {
			slides[slides.length - 2].style.left = `${Math.ceil((timePassed / 10))}%`
			slides[slides.length - 1].style.left = `${Math.ceil(-100 + (timePassed / 10))}%`
		}

	}, 5);
}

const nextSlide = (index = 0) => {
	buttonRight.disabled = true
	let slides = document.querySelectorAll('.slides__slide')
	slides[index].style.left = '100%'
	sliderContainer.appendChild(slides[index])
	animate('forward')
	let timerID = setTimeout(() => {
		if (timerID >= 1000) {
			clearTimeout(timerID)
			return
		}
		currentIndex++
		activeDot(currentIndex)
		console.log(currentIndex)
		buttonRight.disabled = false
		document.querySelectorAll('.slides__slide').forEach(item => item.style = '')
	}, 1000)
}

const previousSlide = () => {
	buttonLeft.disabled = true
	let slides = document.querySelectorAll('.slides__slide')
	slides[slides.length - 2].style.left = '-100%'
	sliderContainer.appendChild(slides[slides.length - 2])
	animate('back')
	let timerID = setTimeout(() => {
		if (timerID >= 1000) {
			clearTimeout(timerID)
			return
		}

		const firstElement = document.querySelector('.slides__container').firstElementChild
		const moveSlide = document.querySelectorAll('.slides__slide')[slides.length - 2]
		document.querySelector('.slides__container').insertBefore(moveSlide, firstElement)
		document.querySelectorAll('.slides__slide').forEach(item => item.style = '')
		currentIndex--
		activeDot(currentIndex)
		buttonLeft.disabled = false

	}, 1000)

}

const showDesiredSlide = (event) => {

	let id = event.target.dataset.id;
	if (id) {
		id -= 1;
		if (currentIndex === id) return;
		const dots = document.querySelectorAll('.slider__dots-item')
		dots.forEach(dot => dot.disabled = true)
		let img = srcImg[id]
		img.style.left = '100%'
		sliderContainer.appendChild(img)
		animate('forward')
		currentIndex = id
		activeDot(currentIndex)
		let timerID = setTimeout(() => {
			if (timerID >= 1000) {
				clearTimeout(timerID)
				return
			}
			dots.forEach(dot => dot.disabled = false)
			document.querySelectorAll('.slides__slide').forEach(item => item.style = '')
		}, 1000)
	}
}

renderDots()

//listeners
dotsContainer.addEventListener('click', () => toggleActiveDot(event))
buttonRight.addEventListener('click', () => nextSlide())
buttonLeft.addEventListener('click', () => previousSlide())
dotsContainer.addEventListener('click', () => showDesiredSlide(event))