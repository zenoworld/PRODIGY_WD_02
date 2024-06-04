let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 1000);
        isRunning = true;
        startStopBtn.textContent = 'Pause';
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    laps = [];
    renderLaps();
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = elapsedTime;
        laps.push(lapTime);
        renderLaps();
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const totalSeconds = Math.floor(lap / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        lapsList.appendChild(lapItem);
    });
}
