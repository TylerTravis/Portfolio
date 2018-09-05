(function () {

	// DOM Elements
	const sliders = document.querySelectorAll('.slider');
	const menuToggle = document.querySelector('.controls-menu');
	const main = document.querySelector('.main');
	const menu = document.querySelector('.menu');
	const menuExitButton = document.querySelector('.menuExitButton');
	const contact = document.querySelector('.controls-contact');
	const logotype = document.querySelector('.logotype');
	const indexContainer = document.querySelector('.controls-indexContainer');
	const textContentContainer = document.querySelector('.textContent');

	// CSS Timings (ms)
	const defaultDuration = 400;
	const defaultDelay = 100;


	// Animation Timings (ms) and related
	const menuExitButtonStartTime = defaultDuration / 2 + defaultDelay * 3;
	const slideCompletionTime = defaultDuration + defaultDelay * 3;
	let menuCanBeToggled = true;
	let imageSlideOneIsActive = true;

	// Slide Animation and Content

	let currentSlide = 0;
	let firstSlideHasBeenAnimated = false;
	let slideAniIsInProgress = false;
	const slideContent = [
		[
			'<h2 class="highlight">– Tyler Travis</h2>',
			'<h1>Web, UI, and UX Designer</h1>',
			"<h2 class='body'>I'm a 22 year old designer from California living in Washington.  My expertise is in creating user centered designs with beautiful aesthetic and translating those designs into websites. This portfolio is a selection of my favorite projects and also the best way to contact me.</h2>",
			'<div class="CTAcontainer"><div class="CTA">VIEW WORK</div><div class="CTA">CONTACT</div></div>'
		],
		[
			'<h2 class="highlight">– UI Design</h2>',
			'<h1>LLT Marketing</h1>',
			'<h2 class="body">LLT Marketing is in the process of rebranding and approached me to design a sleeker, more modern landing page that reflects the culture and clientele that they possess.</h2>',
			'<a target="_blank" href="LLT.html"><div class="CTA">VIEW IMAGE</div></a>'
		],
		[
			'<h2 class="highlight">– UI Design</h2>',
			'<h1>Heliconia Caribea</h1>',
			'<h2 class="body">Heliconia Caribea is a conglomerate of businesses and real estate owned or invested in by Joanne and Alistair Assheton.  The couple hired me to design a new UI for the HC website that would showcase their interests and investments.</h2>',
			'<a target="_blank" href="HC.html"><div class="CTA">VIEW IMAGE</div></a>'
		],
		[
			'<h2 class="highlight">– Wordpress Theme Concept</h2>',
			'<h1>Summit</h1>',
			'<h2 class="body">Summit is a Wordpress theme tailored for SaaS startups that want to showcase their products, services, and business to potential investors and future clients.</h2>',
			'<a target="_blank" href="summit.html"><div class="CTA">VIEW IMAGE</div></a>'
		],
		[
			'<h1>About Me</h1>',
			"<h2 class='body'>I love dogs, MMA, craft beer, and the feeling of improvement. I'm always learning new methods of creating value for my clients. For the past two years, this has namely been UX but also includes Wordpress and 3D animation.  I'm currently available as either a freelancer or employee, and I'm always looking to take on new and exciting projects!</h2 > ",
			'<h1>Experience</h1>',
			'<div class="experienceContainer"><p class="experience">HTML  –  4 YEARS</p><p class="experience">CSS  –  4 YEARS</p><p class="experience">JS  –  3 YEARS</p><p class="experience">SASS  –  2 YEARS</p><p class="experience">UI DESIGN  –  4 YEARS</p><p class="experience">UX DESIGN  –  2 YEARS</p><p class="experience">SKETCH  –  4 YEARS</p></div>',
			'<div class="CTA" style="margin-top: 30px;">CONTACT</div>'
		],
		[
			'<h1>Contact</h1>',
			'<h2 class="body">If you want to talk about your project or discuss how we could work together, shoot me an email. You can also view my freelance profile on UpWork if you want to setup a contract or see what clients have said about me.</h2>',
			'<div class="CTAcontainer"><a onClick="location.href=\'mailto:tylerjamestravis@gmail.com\'"><div class="CTA">EMAIL</div></a><a target="_blank" href="https://www.upwork.com/freelancers/~01fdcc9a9746b46dc8"><div class="CTA">UPWORK</div></a></div>'
		]
	]

	function activateSlider(el) {
		// Checks and sets reactivation timer
		if (el === menu) {
			if (menuCanBeToggled) {
				menuCanBeToggled = false;
				setTimeout(() => menuCanBeToggled = true, slideCompletionTime);
			} else {
				return;
			}
			// if (!menuCanBeToggled) {
			// 	return;
			// }
			// else {
			// 	menuCanBeToggled = false;
			// 	setTimeout(function () {
			// 		menuCanBeToggled = true;
			// 	}, slideCompletionTime * 2);
			// }
		}

		// Set display
		el.style.display = "flex";
		
		for (let i = 0; i < el.children.length; i++) {
			setTimeout(function () {
				el.children[i].children[0].style.transform = 'translateX(0)';
			}, defaultDelay * i);
		}

		if (el === menu) {
			displayMenuExitButton();

			// Sets borders on all slides but the last
			for (let i = 0; i < el.children.length; i++) { 
				if (i !== 3) {
					if (window.innerWidth > window.innerHeight) {
						el.children[i].children[0].style.borderRight = "1px solid #aaaaaa";
					} else {
						el.children[i].children[0].style.borderBottom = "1px solid #aaaaaa";
					}
				}
			}
		}
	}

	function deactivateSlider(el) {
		// Enables re-activation after completion
		setTimeout(function () {
			if (el === menu) menuCanBeToggled = true;
			if (el === main) mainCanBeToggled = true;
		}, slideCompletionTime);

		// Sequential Slide Animation
		for (let i = 0; i < el.children.length; i++) {
			// Translate right, out of sight
			setTimeout(function () {
				el.children[i].children[0].style.transform = 'translateX(105%)';
			}, defaultDelay * i);

			if (i !== 3) el.children[i].children[0].style.borderRight = "none";

			// Reset slides to initial state
			setTimeout(function () {
				el.children[i].children[0].style.transition = "all 0s";
				el.children[i].children[0].style.transform = 'translateX(-105%)';
			}, defaultDelay * i + defaultDuration);

			setTimeout(function () {
				el.children[i].children[0].removeAttribute('style');
				el.removeAttribute('style');
			}, slideCompletionTime);
		}

		// If slider being deactivated is the menu...
		if (el === menu) hideMenuExitButton();
	}

	function displayMenuExitButton() {
		
		setTimeout(() => {
			menuExitButton.style.display = "flex";
			menuExitButton.style.alignItems = "center";
			menuExitButton.style.justifyContent = "center";
			menuExitButton.style.opacity = '1';
		}, menuExitButtonStartTime);
	}

	function hideMenuExitButton() {
		setTimeout(function () {
			menuExitButton.style.opacity = '0';
		}, menuExitButtonStartTime);

		setTimeout(function () {
			menuExitButton.removeAttribute('style');
		}, slideCompletionTime);
	}

	function swapImageSlides() {
		for (let i = 0; i < main.children.length; i++) {
			if (imageSlideOneIsActive) {
				// Slide .two in and set .one's transition to 0
				setTimeout(function () {
					main.children[i].children[1].style.transform = 'translateX(0%)';
					main.children[i].children[0].style.transition = 'all 0s';
				}, i * defaultDelay);

				// Slide .one out instantly and swap z-indices
				setTimeout(function () {
					main.children[i].children[0].style.transform = 'translateX(-102%)';
					main.children[i].children[0].style.zIndex = '1';
					main.children[i].children[1].style.zIndex = '0';
					
				}, i * defaultDelay + defaultDuration);

				// Set .one to have normal transition again
				setTimeout(function () {
					main.children[i].children[0].style.transition = 'all 0.4s ease-out';
				}, i * defaultDelay + defaultDuration + 50);

			} else {
				// Slide .one in and set .two's transition to 0
				setTimeout(function () {
					main.children[i].children[0].style.transform = 'translateX(0%)';
					main.children[i].children[1].style.transition = 'all 0s';
				}, i * defaultDelay);

				// Slide .two out instantly and swap z-indices
				setTimeout(function () {
					main.children[i].children[1].style.transform = 'translateX(-102%)';
					main.children[i].children[1].style.zIndex = '1';
					main.children[i].children[0].style.zIndex = '0';

				}, i * defaultDelay + defaultDuration);

				// Set .two to have normal transition again
				setTimeout(function () {
					main.children[i].children[1].style.transition = 'all 0.4s ease-out';
				}, i * defaultDelay + defaultDuration + 50);
			}
		}
		imageSlideOneIsActive = !imageSlideOneIsActive;
	}

	function loadNewSlideImage(index) {
		let url = `assets/images/bg${index + 1}.jpg`;
		for (let i = 0; i < main.children.length; i++) {
			if (imageSlideOneIsActive) main.children[i].children[1].children[0].setAttribute('src', url);
			else main.children[i].children[0].children[0].setAttribute('src', url);
		}
	}

	function updateMenuIndices() {
		const menuAboutTitle = document.querySelector('.slideContainer:nth-of-type(3) h2');
		const menuContactTitle = document.querySelector('.slideContainer:nth-of-type(4) h2');
		if (window.innerWidth > 600) {
			menuAboutTitle.innerHTML = "05";
			menuContactTitle.innerHTML = "06";
		} else {
			menuAboutTitle.innerHTML = "03";
			menuContactTitle.innerHTML = "04";
		}
	}

	

	function checkAndSetSlideTimeout() {
		if (slideAniIsInProgress) {
			return true;
		} else {
			slideAniIsInProgress = true;
			setTimeout(function () {
				slideAniIsInProgress = false;
			}, slideCompletionTime);
			return false;
		}
	}

	function updateSlideIndex(index) {
		if (index === currentSlide && firstSlideHasBeenAnimated) {
			return false;
		} else {
			firstSlideHasBeenAnimated = true;
			currentSlide = index;
			return true;
		}
	}

	function updateBackground(index) {

		// Select image to load
		loadNewSlideImage(index);

		// Swap slide positions
		swapImageSlides();


	}


	// fimctom cpmst let var adsfadsf

	function resizeBackground() {
		if (window.innerWidth < 1400) {

			// Offset centers the images that should be
			let offset;
			switch (currentSlide) {
				case 0: offset = (1400 - window.innerWidth) / 2; break;
				case 1: offset = (1400 - window.innerWidth) / 2; break;
				case 2: offset = 0; break;
				case 3: offset = (1400 - window.innerWidth) / 2; break;
				case 4: offset = (1400 - window.innerWidth) / 2; break;
				case 5: offset = (1400 - window.innerWidth) / 2; break;
				// case 5: offset = 0; break;
			}

			for (let i = 0; i < main.children.length; i++) {
				if (imageSlideOneIsActive) {

					// Targets .one img
					main.children[i].children[0].children[0].style.transform = `translateX(-${window.innerWidth / 4 * i + offset}px)`;

				} else {
					// Targets .two img
					main.children[i].children[1].children[0].style.transform = `translateX(-${window.innerWidth / 4 * i + offset}px)`;
				}
			}
		} else {
			for (let i = 0; i < main.children.length; i++) {
				main.children[i].children[0].children[0].removeAttribute('style');
				main.children[i].children[1].children[0].removeAttribute('style');
			}
		}
	}

	function updateTextContent(index) {
		let incomingContentDelay = 0;

		// If textContent already has content
		if (textContentContainer.children.length !== 0) {
			// This will be used for delaying subsequent animations
			incomingContentDelay = defaultDuration / 2;
			for (let i = 0; i < textContentContainer.children.length; i++) {
				// Translate right and fade all .textContent children simultaneously
				textContentContainer.children[i].style.opacity = '0';
				textContentContainer.children[i].style.transform = 'translateX(25px)';
			}
		}

		// Erase old content
		// setTimeout(function () {
		textContentContainer.innerHTML = '';
		// }, incomingContentDelay);

		// Append new content and set to animate with delay
		for (let i = 0; i < slideContent[index].length; i++) {
			textContentContainer.innerHTML += slideContent[index][i];

			setTimeout(function () {
				textContentContainer.children[i].style.opacity = '1';
				textContentContainer.children[i].style.transform = 'translateX(0px)';
			}, incomingContentDelay + defaultDelay * i);
		}




		// Translate and fade in .textContent children with sequential delays


	}

	function setCTAListener(index) {
		const cta = document.querySelector('.CTA');
		if (index === 0) var cta2 = document.querySelector('.CTA:nth-of-type(2)');

		switch (index) {
			case 0:
				cta.addEventListener('click', function () { loadSlide(1); });
				cta2.addEventListener('click', function () { loadSlide(5); }); break;
			case 4: cta.addEventListener('click', function () { loadSlide(5); }); break;
			default: break;
		}
	}

	function updateIndices(index) {
		const activeIndexElement = document.querySelector('.controls-index-active');
		const newIndex = document.querySelector(`.controls-index:nth-of-type(${index + 1})`);

		activeIndexElement.classList.remove('controls-index-active');		
		newIndex.classList.add('controls-index-active');
	}

	function adjustContentHeight(index) {



		if (index === 4) {
			textContentContainer.style.justifyContent = `flex-start`;
			if (window.innerWidth <= 745) {
				textContentContainer.classList.add('aboutContent');
			} 

			if (window.innerWidth <= 600) {
				textContentContainer.style.position = `absolute`;
			}
		} else {
			textContentContainer.removeAttribute('style');
			textContentContainer.classList.remove('aboutContent');
		}
	}

	function loadSlide(index) {
		// If slide ani is still in progress, cancels func. Otherwise it sets it.
		if (checkAndSetSlideTimeout()) return;
		// Check and update currentSlide
		if (!updateSlideIndex(index)) return;

		// Reset sliding conditions for about swiping
		if (currentSlide === 4 && window.innerWidth <= 600) {
			bottomIsReached = false;
			topIsReached = false;
		}
		
		updateBackground(index);
		resizeBackground();
		updateTextContent(index);
		setCTAListener(index);
		updateIndices(index);
		adjustContentHeight(index);
	}

	


	// For browsers with shifting window heights like i-devices or apps that are loading a web page in their own view with their additional view content (reddit or facebook browsing)
	function setSliderHeight() {
		for (let i = 0; i < sliders.length; i++) {
			sliders[i].style.height = `${window.innerHeight}px`;
			sliders[i].style.width = `${window.innerWidth}px`;
		}
	}

	// Disables index change on reaching bottom or top of about textContentContainer.
	// Both are reset to false when the about slide is loaded by loadSlide()
	var bottomIsReached = true, topIsReached = true;
	function aboutIndexCanChange() {
		if (window.scrollY + window.innerHeight === textContentContainer.clientHeight) {
			bottomIsReached = true;
		} else if (window.scrollY === 0) {
			topIsReached = true;
		} else {
			bottomIsReached = false;
			topIsReached = false;
		}
	}




	// Contact label listener
	contact.addEventListener('click', function () {
		loadSlide(5);
	});

	// Menu Event Listeners
	menuToggle.addEventListener('click', function () {
		activateSlider(menu);
	});

	menuExitButton.addEventListener("click", function () {
		deactivateSlider(menu);
	});

	// TODO: ADJUST MENU INDICES BASED ON MOBILE OR DESKTOP???
	for (let i = 0; i < menu.children.length; i++) {
		switch (i) {
			case 0:
				menu.children[i].addEventListener('click', function () {
					deactivateSlider(menu);
					loadSlide(0);
				}); break;
			case 1:
				menu.children[i].addEventListener('click', function () {
					deactivateSlider(menu);
					loadSlide(1);
				}); break;
			case 2:
				menu.children[i].addEventListener('click', function () {
					deactivateSlider(menu);
					loadSlide(4);
				}); break;
			case 3:
				menu.children[i].addEventListener('click', function () {
					deactivateSlider(menu);
					loadSlide(5);
				}); break;
			default: console.warn('Menu switch statement fell through');
		}

		
	}

	// Logotype
	logotype.addEventListener('click', function () {
		loadSlide(0);
	});

	// TODO: SEE IF STILL NECESSARY

	// Touch and Click Behavior on indices
	indexContainer.addEventListener('touchend', function (ev) {
		ev.preventDefault();
	});

	// Touch and Click Behavior on indices
	indexContainer.addEventListener('touchstart', function (ev) {
		ev.preventDefault();
	});

	// Index Event Listeners
	for (let i = 0; i < indexContainer.children.length; i++) {
		indexContainer.children[i].addEventListener('click', function () {
			loadSlide(i);
		});

		indexContainer.children[i].addEventListener('touchend', function () {
			loadSlide(i);
		});
	}





	let touchStartY, touchEndY;
	// Log initial touch
	addEventListener('touchstart', function (ev) {
		touchStartX = ev.changedTouches['0'].clientX;
		touchStartY = ev.changedTouches['0'].clientY;

		// for (let i = 0; i < indexContainer.children.length; i++) {
		// 	indexContainer[i].classList.add('disableIndexHover');
		// }
		if (window.innerWidth > 625 && window.innerWidth <= 900) indexContainer.classList.add('indexHoverDisable-extended');
		if (window.innerWidth < 625 || window.innerWidth > 900) indexContainer.classList.add('indexHoverDisable-standard');
	});

	// Change index on swipe up or down
	addEventListener('touchend', function (ev) {
		touchEndX = ev.changedTouches['0'].clientX;
		touchEndY = ev.changedTouches['0'].clientY;

		if (currentSlide !== 4) {
			if (touchStartY - touchEndY > 0 &&
				Math.abs(touchStartY - touchEndY) > 50 &&
				currentSlide !== 5) {

				loadSlide(currentSlide + 1);

			} else if (touchStartY - touchEndY < 0 &&
				Math.abs(touchStartY - touchEndY) > 50 &&
				currentSlide !== 0) {

				loadSlide(currentSlide - 1);
			}
		} else {
			// For touch screens using mobile layout
			if (window.innerWidth <= 600) {
				if (
					touchStartY - touchEndY > 0 &&
					Math.abs(touchStartY - touchEndY) > 50 &&
					currentSlide !== 5 &&
					bottomIsReached) {

					loadSlide(currentSlide + 1);
				} else if (
					touchStartY - touchEndY < 0 &&
					Math.abs(touchStartY - touchEndY) > 50 &&
					currentSlide !== 0) {

					loadSlide(currentSlide - 1);
				}
				aboutIndexCanChange();
			} else {
				// For touch screens not using mobile layout
				if (
					touchStartY - touchEndY > 0 &&
					Math.abs(touchStartY - touchEndY) > 50 &&
					currentSlide !== 5 &&
					bottomIsReached) {

					loadSlide(currentSlide + 1);
				} else if (
					touchStartY - touchEndY < 0 &&
					Math.abs(touchStartY - touchEndY) > 50 &&
					currentSlide !== 0) {

					loadSlide(currentSlide - 1);
				}
			}
		}
	});

	// Scroll listener
	addEventListener('wheel', function (e) {
		if (e.deltaY > 0 && currentSlide !== 5) loadSlide(currentSlide + 1);
		if (e.deltaY < 0 && currentSlide !== 0) loadSlide(currentSlide - 1);
	});

	// Resize
	addEventListener('resize', function () {
		adjustContentHeight(currentSlide);
		resizeBackground();
		setSliderHeight();
		updateMenuIndices();

	})

	// Reset slider heights on
	addEventListener('focus', setSliderHeight);
	addEventListener('pageshow', setSliderHeight);






	// On page load
	loadSlide(0);
	setSliderHeight();
	updateMenuIndices();



	// Loader



	// XHR images

	// On load, increment loading bar

	// When complete, load main page

	

	// const preloadedImageURLS = [
	// 	'assets/images/bg1.jpg',
	// 	'assets/images/bg2.jpg',
	// 	'assets/images/bg3.jpg',
	// 	'assets/images/bg4.jpg',
	// 	'assets/images/bg5.jpg',
	// 	'assets/images/bg6.jpg'
	// ];
	// const loader = document.querySelector('.loader');
	// const preloadEls = document.querySelectorAll('.preload');
	// const logo = document.querySelector('.logo');
	// const progressTotal = document.querySelector('.progressTotal');
	// const progressAmount = document.querySelector('.progressAmount');
	// let preloadCounter = 0;

	// function hideLoader() {
	// 	for (let i = 0; i < 4; i++) {
	// 		setTimeout(() => {
	// 			loader.children[i].children[0].style.transform = 'translateX(105%)';
	// 		}, i * defaultDelay);
	// 	}

	// 	setTimeout(() => {
	// 		loader.style.display = 'none';
	// 	}, defaultDelay * 3 + defaultDuration);

	// 	logo.style.opacity = 0;
	// 	progressTotal.style.opacity = 0;
	// 	progressAmount.style.opacity = 0;


	// }

	// window.onload = () => {

	// 	// Display logo
	// 	logo.style.opacity = 1;

	// 	for (let i = 0; i < preloadEls.length; i++) {
	// 		preloadEls[i].setAttribute('src', preloadedImageURLS[i]);
	// 		preloadEls[i].onload = () => { 
	// 			preloadCounter++
	// 			progressAmount.style.width = `${preloadCounter * 50}px`;

	// 			if (preloadCounter === preloadEls.length) { 
	// 				setTimeout(() => { hideLoader() }, 500);	
	// 			} 
	// 		};
	// 	}
	// }

})();