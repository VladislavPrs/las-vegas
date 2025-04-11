document.addEventListener("DOMContentLoaded", () => {
	// Блокируем прокрутку, пока идет вся анимация и переход
	document.body.style.overflow = "hidden";

	// Элементы из блока invite
	const subtitle = document.querySelector(".invite__subtitle");
	const title = document.querySelector(".invite__title");
	const subtext = document.querySelector(".invite__subtext");
	const inviteDescription = document.querySelector(".invite__desctiption");
	const confettiVideo = document.querySelector(".invite__confetti");

	// Элементы из блока video
	const mainVideo = document.querySelector(".video__video");
	const pageVideo = document.querySelector(".page__video");
	const videoDescription = document.querySelector(".video__desctiption");
	const videoTitle = document.querySelector(".video__title");
	const videoArrow = document.querySelector(".video__arrow");

	// Запускаем анимацию для invite__subtitle (4 сек)
	subtitle.classList.add("start-subtitle");

	// После завершения анимации invite__subtitle (4 сек) показываем invite__title
	setTimeout(() => {
		title.classList.add("visible");
		subtext.classList.add("visible");

		// Через 1 секунду после появления invite__title показываем invite__desctiption
		// и запускаем видео invite__confetti
		setTimeout(() => {
			inviteDescription.classList.add("visible");
			if (confettiVideo && confettiVideo.play) {
				confettiVideo.play();
				confettiVideo.classList.add("playing");
			}

			// Через 1.5 сек после появления invite__desctiption запускаем плавную прокрутку к блоку page__video (2 сек)
			setTimeout(() => {
				smoothScrollTo(pageVideo.offsetTop, 2000);

				// Через 0.4 сек после начала прокрутки запускается основное видео блока video
				// и одновременно анимируются его текстовые элементы с эффектом pop (появление за 2 сек, затем уменьшение за 1 сек)
				setTimeout(() => {
					if (mainVideo && mainVideo.play) {
						mainVideo.play();
						mainVideo.classList.add("playing");
					}
					videoDescription.classList.add("pop");
					videoTitle.classList.add("pop");
					videoArrow.classList.add("arrow-show");
				}, 400);

				// После завершения прокрутки (2 сек) разрешаем скролл
				setTimeout(() => {
					document.body.style.overflow = "";
				}, 2000);
			}, 2000);
		}, 1500);
	}, 3500);
});

function smoothScrollTo(targetY, duration) {
	const startY = window.pageYOffset;
	const distance = targetY - startY;
	let startTime = null;

	function animation(currentTime) {
		if (!startTime) startTime = currentTime;
		const timeElapsed = currentTime - startTime;
		const progress = Math.min(timeElapsed / duration, 1);
		window.scrollTo(0, startY + distance * easeInOutQuad(progress));
		if (timeElapsed < duration) {
			requestAnimationFrame(animation);
		}
	}

	function easeInOutQuad(t) {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	}

	requestAnimationFrame(animation);
}
