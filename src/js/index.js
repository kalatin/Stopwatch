import declOfNum from './declOfNum.js';

class Timer {
	constructor(secondsElem, minutesElem, hoursElem) {
		this.milliseconds = 0;
		this.secondsElem = secondsElem;
		this.minutesElem = minutesElem;
		this.hoursElem = hoursElem;
		this.interval;
	}

	startTimer() {
		this.milliseconds = this.milliseconds + 1;
		if (this.milliseconds > 99) {
			this.milliseconds = 0;
			this.secondsElem.textContent = String(+this.secondsElem.textContent + 1).padStart(2, '0');
			this.secondsElem.nextElementSibling.textContent = declOfNum(this.secondsElem.textContent, [
				'Секунда',
				'Секунды',
				'Секунд',
			]);
		}
		if (+this.secondsElem.textContent > 59) {
			this.secondsElem.textContent = '00';
			this.minutesElem.textContent = String(+this.minutesElem.textContent + 1).padStart(2, '0');
			this.minutesElem.nextElementSibling.textContent = declOfNum(this.minutesElem.textContent, [
				'Минута',
				'Минуты',
				'Минут',
			]);
		} else if (+this.minutesElem.textContent > 59) {
			this.minutesElem.textContent = '00';
			this.hoursElem.textContent = String(+this.hoursElem.textContent + 1).padStart(2, '0');
			this.hoursElem.nextElementSibling.textContent = declOfNum(this.hoursElem.textContent, [
				'Час',
				'Часа',
				'Часов',
			]);
		}
	}

	clearFields() {
		this.milliseconds = 0;
		this.secondsElem.textContent = '00';
		this.minutesElem.textContent = '00';
		this.hoursElem.textContent = '00';
	}
}

let ex1Timer = new Timer(
	document.querySelector('.timer__seconds'),
	document.querySelector('.timer__minutes'),
	document.querySelector('.timer__hours')
);

document.addEventListener('click', e => {
	if (e.target.closest('.start')) {
		clearInterval(ex1Timer.interval);
		ex1Timer.interval = setInterval(() => {
			ex1Timer.startTimer();
		}, 10);
		e.target.classList.remove('start');
		e.target.classList.add('pause');
		e.target.textContent = 'Стоп';
	} else if (e.target.closest('.pause')) {
		clearInterval(ex1Timer.interval);
		e.target.classList.remove('pause');
		e.target.classList.add('start');
		e.target.textContent = 'Старт';
	} else if (e.target.closest('.reset')) {
		clearInterval(ex1Timer.interval);
		ex1Timer.clearFields();
		if (document.querySelector('.pause')) {
			document.querySelector('.pause').textContent = 'Старт';
			document.querySelector('.pause').classList.add('start');
			document.querySelector('.pause').classList.remove('pause');
		}
		document.querySelectorAll('.timer__lap').forEach(item => {
			item.remove();
		});
		document.querySelector('.timer__laps').style.display = 'none';
	} else if (e.target.closest('.lap')) {
		if (document.querySelector('.pause')) {
			document.querySelector('.timer__laps').style.display = 'block';
			let hours = ex1Timer.hoursElem.textContent;
			let minutes = ex1Timer.minutesElem.textContent;
			let seconds = ex1Timer.secondsElem.textContent;

			document.querySelector('.timer__laps').insertAdjacentHTML(
				'beforeend',
				`
				<div class="timer__lap">
					<div class="timer__lap-num">${String(document.querySelector('.timer__laps').childElementCount).padStart(2, '0')}</div>
					<div class="timer__lap-time">${hours}:${minutes}:${seconds}</div>
				</div>
			`
			);
		}
	}
});
