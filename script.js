const container = document.querySelector('div');
const header = document.querySelector('header');
const btnClean = document.createElement('button');
const btnSet = document.createElement('button');
btnClean.textContent = 'Clear Grid'
btnSet.textContent = 'Set Grid'

function random(number){
    return Math.floor(Math.random()*number);
  } 

function addCustomEventListener(selector, event, handler) {
    let rootElement = document.querySelector('.container');
    console.log(rootElement);
    rootElement.addEventListener(event, function (evt) {
            let targetElement = evt.target;
            console.log(targetElement)
            while (targetElement != null) {
                if (targetElement.matches(selector)) {
                    console.log(evt.target)
                    handler(evt.target);
                    return;
                }
                targetElement = targetElement.parentElement;
            }
        },
        true
    );
}

function makeGrid(x){
    if (x > 100){
        x = 100;
    }
    let fragment = new DocumentFragment();
    for(let i = 0; i < (x*x); i++){
        let child = document.createElement('div');
        child.classList.add('child');

        fragment.appendChild(child);
    } container.appendChild(fragment);
    container.style.setProperty('grid-template-columns', `repeat(${x}, 1fr)`);
}

makeGrid(16);

function deleteGrid(){
    let deletedGrids = document.querySelectorAll('.child');
    deletedGrids.forEach(function(child){
        child.remove();
    })
}

function setGrid(y){
    y = parseInt(prompt('How many pixels per side?'))
    deleteGrid();
    makeGrid(y)
    for(let child of document.querySelectorAll('.child')){
        child.addEventListener('mouseenter', changeColor);
    }
}
const grids = document.querySelectorAll('.child');

function changeColor(e){
    this.style.backgroundColor = `rgba(${random(255)}, ${random(255)}, ${random(255)}`;
}
function clearColor(){
    for(let child of document.querySelectorAll('.child')){
        child.style.backgroundColor = 'white'
    }
}


grids.forEach(function(child){
    child.addEventListener('mouseenter', changeColor)
})

//container.addEventListener('mouseover', changeColor, true);

btnClean.addEventListener('click', clearColor);
btnSet.addEventListener('click', setGrid)

header.appendChild(btnClean);
header.appendChild(btnSet);