const { position, paths } = data;

const forward = document.getElementById("btn-forward");
const backward = document.getElementById("btn-backward");
const map = document.getElementById("map");
const model = document.getElementById("model");
const stepDuration = 500;

let current = 0;
if (localStorage.getItem('current'))
    current = localStorage.getItem('current');

model.style.transform = "translate(-50%, -100%)";
model.style.left = `${position[current][0]}px`;
model.style.top = `${position[current][1]}px`;




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
    if (current == paths.length) return;
    resetModel();
    model.setAttribute("style", `offset-path: path('${paths[current++]}')`);
    model.style.animationDuration = stepDuration + "ms";
    disableButtons(stepDuration);
    localStorage.setItem('current', current);
})

backward.addEventListener('click', function () {
    if (current == 0) return;
    resetModel();
    model.setAttribute("style", `offset-path: path('${paths[--current]}')`);
    model.style.animationDirection = 'reverse';
    model.style.animationDuration = stepDuration + "ms";
    localStorage.setItem('current', current);
    disableButtons(stepDuration);
})

window.onload = () => document.getElementById('loader').style.display = 'none';