const bar = document.getElementById("barElement");
const tik = document.getElementById("focus");
const canvas = document.getElementById("canvasId");
const body = document.querySelector("body");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let theColor = '';
let line = 5;
let prevX = null;
let prevY = null;
let draw = false;

tik.addEventListener('click', (e) => {
    e.preventDefault();
    bar.classList.add("barActive");
    tik.classList.add("focusactive");

    arrow();
   
})

canvas.addEventListener('mouseup', (e) => {
    e.preventDefault();

    bar.classList.remove("barActive");
    tik.classList.remove("focusactive");

    bar.setAttribute("style","transition: all 600ms;");
    tik.setAttribute("style","transition: all 500ms;");

    const downTik = document.getElementById("down");
    
    downTik.setAttribute("style","transform: rotateZ(0deg);");


})

function arrow() {

    const downTik = document.getElementById("down");

    downTik.setAttribute("style", "visibility: hidden;");
    downTik.setAttribute("style", "transform: rotateZ(-180deg);");
}

body.style.backgroundColor = "#fff";
const Input = document.getElementById("favcolor");

Input.addEventListener('input', () => {
    theColor = Input.value;
    body.style.backgroundColor = theColor;
},false);

const ctx = canvas.getContext('2d');
ctx.lineWidth = line;

document.getElementById("sizeId").oninput = () => {
    draw = null;
    line = document.getElementById("sizeId").value;
    document.getElementById("sizeOut").innerHTML = line;
    ctx.lineWidth = line;
}

let colors = document.querySelectorAll(".clr");

colors = Array.from("colors");
colors.forEach(clr  => {
    clr.addEventListener('click', () => {
        clr = e.target.value;
    })
})

let clearBtn = document.getElementById("clear");

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

let saveBtn = document.getElementById("save");

saveBtn.addEventListener('click', () => {
    let data = canvas.toDataURL("images/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "deneme.png";
    a.click();
})

window.addEventListener('mousedown', (e) => draw = true);
window.addEventListener('mouseup', (e) => draw = false);

window.addEventListener('mousemove', (e) => {
    if(prevX == null || prevY == null || !draw)
    {
        prevX = e.clientX;
        prevY = e.clientY;
        return
    }

    let currentX = e.clientX;
    let currentY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    ctx.lineWidth = line * 2;

    prevX = currentX;
    prevY = currentY;   
})