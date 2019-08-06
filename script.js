let n = 16;
const container = document.querySelector('.container');
const width = (document.querySelector('body').clientWidth);
const reset = document.querySelector('.reset');
const colorful = document.querySelector('.colorful');
const blackColor = document.querySelector('.blackColor');
const scalesGrey = document.querySelector('.scalesGrey');
const clearAll = document.querySelector('.clearAll');

container.style.display = "grid";
container.style.height = `${width/3}px`;
container.style.width = `${width/3}px`;
container.style.position = `absolute`;
container.style.left = `${width/3}px`;
container.style.border = 'solid black 1px';

function buildGrid(num) {
    container.style.gridTemplateColumns = `repeat(${n},${width/(n*3)}px)`;
    container.style.gridTemplateRows = `repeat(${n},${width/(n*3)}px)`;
    for(let i=0 ; i < num ; i++) {
        for(let j = 0 ; j < num ; j++) {
            
            let box = document.createElement('div');
            box.style.background = "blue";
            container.appendChild(box);
        }
    }
}

//LISTENERS DOWN

function startAgain() {
    let num = Number(prompt("How many squares for your new grid?",16));
    if(typeof(num) === 'number' && num > 0) {
        divs = document.querySelectorAll('div');
        for (let i = 3 ; i < n*n + 3 ; i++) {
            container.removeChild(divs[i]);
        }
        n = num;
        buildGrid(n);
        paintBlack();
    }
    else {
        return;
    }
}

function paintBlack() {
    boxes.forEach(e => {e.removeEventListener('mouseover',randomColor);});
    boxes.forEach(e => {e.removeEventListener('mouseover',scalesGrey);});
    boxes.forEach(e => {e.addEventListener('mouseover',blackBox);});
}

function paintColor() {
    boxes.forEach(e => {e.removeEventListener('mouseover',scalesGrey);});
    boxes.forEach(e => {e.removeEventListener('mouseover',blackBox);});
    boxes.forEach(e => {e.addEventListener('mouseover',randomColor);});
}

function paintScales() {
    boxes.forEach(e => {e.removeEventListener('mouseover',randomColor);});
    boxes.forEach(e => {e.removeEventListener('mouseover',blackBox);});
    boxes.forEach((e) => {
        e.addEventListener('mouseover',scales);
        e.opac = 0;
    });
}

// ACTUAL PAINTING DOWN HERE

function blackBox() {
    this.style.background = "black";
}

function randomColor() {
    r = Math.random()*256;
    g = Math.random()*256;
    b = Math.random()*256;
    this.style.background = `rgb(${r},${g},${b},1)`;
}

function scales(o) {
    this.style.background = `rgb(0,0,0,${o.target.opac})`;
    // this.style.opacity = `${o.target.opac}`;
    o.target.opac += 0.1; 
}

function cleanAll() {
    boxes.forEach( e => {e.style.background = "blue"; e.style.opacity = "1"});
}

reset.addEventListener('click', startAgain);
colorful.addEventListener('click',paintColor);
blackColor.addEventListener('click',paintBlack);
scalesGrey.addEventListener('click',paintScales);
clearAll.addEventListener('click',cleanAll);

buildGrid(n);
let boxes = container.childNodes;
paintBlack();


