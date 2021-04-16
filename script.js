const { position, paths, list, rating, friends } = data;
const clickSound = document.getElementById("click-sound");
const icons = document.querySelectorAll(".icon");
const squares = document.querySelectorAll(".square");
const forward = document.getElementById("btn-forward");
const backward = document.getElementById("btn-backward");
const left = document.getElementById("left");
const right = document.getElementById("right");
const ratingBtn = document.getElementById("rating");
const ratingCloseBtn = document.getElementById("rating-close");
const ratingInner = document.getElementById("rating-inner");
const map = document.getElementById("map");
const model = document.getElementById("model");
const modal = document.getElementById("modal");
const stepDuration = 700;
const tabs = document.querySelectorAll('.tab');

let currentListItem = 0;
let currentStep = 0;
if (localStorage.getItem('currentStep'))
    currentStep = localStorage.getItem('currentStep');

model.style.transform = "translate(-50%, -100%)";
model.style.left = `${position[currentStep][0]}px`;
model.style.top = `${position[currentStep][1]}px`;

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        clickSound.play();
    });
});

left.addEventListener('click', () => {
    if (currentListItem == list.length - 1) return;
    resetSquares();
    currentListItem++;
    setSquares();
});
right.addEventListener('click', () => {
    if (currentListItem == -7) return;
    resetSquares();
    currentListItem--;
    setSquares();
});

// List contains numbers: 1-with user logo,  2-with add button
const setSquares = () => {
    squares.forEach((square, i) => {
        if (list[i + currentListItem] > 0) {
            const node = document.createElement('div');
            node.className = "user";
            square.appendChild(node)
        }
        if (list[i + currentListItem] == 2) {
            const node = document.createElement('div');
            node.className = "add";
            square.appendChild(node)
        }
    });
}

const resetSquares = () => {
    squares.forEach(square => {
        square.innerHTML = "";
    })
}

const enableButtons = () => {
    forward.disabled = false
    backward.disabled = false
}

const disableButtons = (timeout) => {
    forward.disabled = true
    backward.disabled = true
    setTimeout(() => enableButtons(false), timeout);
}

const resetModel = () => {
    model.className = "";
    map.removeChild(model);
    map.appendChild(model);
}

forward.addEventListener('click', () => {
    if (currentStep == paths.length) return;
    resetModel();
    model.setAttribute("style", `offset-path: path('${paths[currentStep++]}')`);
    model.style.animationDuration = stepDuration + "ms";
    disableButtons(stepDuration);
    localStorage.setItem('currentStep', currentStep);
})

backward.addEventListener('click', function () {
    if (currentStep == 0) return;
    resetModel();
    model.setAttribute("style", `offset-path: path('${paths[--currentStep]}')`);
    model.style.animationDirection = 'reverse';
    model.style.animationDuration = stepDuration + "ms";
    localStorage.setItem('currentStep', currentStep);
    disableButtons(stepDuration);
})

ratingBtn.addEventListener('click', function () {
    modal.classList.add('visible');
});

ratingCloseBtn.addEventListener('click', function () {
    modal.classList.remove('visible');
});

rating.sort((a, b) => b.points - a.points);
rating.forEach((item, i) => {
    const node = document.createElement('li');
    node.innerHTML = `
        <span class="place">${i + 1}</span>
        <span class="name">${item.name}</span>
        <span class="experience">${item.points}</span>
    `;
    if (friends.some(e => e.id == item.id)) node.classList.add('friend');
    ratingInner.appendChild(node);
});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(e => e.classList.remove('active'))
        tab.classList.add('active')
    })
});

setSquares();
window.onload = () => document.getElementById('loader').style.display = 'none';