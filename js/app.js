const python = document.querySelector('#python');
const tooltip = document.querySelector('#tooltip');
const java = document.querySelector('#java');
const tooltip2 = document.querySelector('#tooltip2');

const x = python.offsetLeft;
const y = python.offsetTop;
const x2 = java.offsetLeft;
const y2 = java.offsetTop;

const anchoT = tooltip.clientWidth;
const altoT = tooltip.clientHeight;
const anchoT2 = tooltip2.clientWidth;
const altoT2 = tooltip2.clientHeight;

const izq = x - (anchoT/4) + 40;
const arriba = y - altoT - 30;
const izq2 = x2 - (anchoT2/4) + 40;
const arriba2 = y2 - altoT2 - 30;

tooltip.style.left = `${izq}px`;
tooltip.style.top = `${arriba}px`;
tooltip2.style.left = `${izq2}px`;
tooltip2.style.top = `${arriba2}px`;

python.addEventListener('mouseenter',() => {
    tooltip.classList.add('ls_activo');
});
java.addEventListener('mouseenter',() => {
    tooltip2.classList.add('ls_activo');
});
let timer;
let timer2;

python.addEventListener('mouseleave', ()=> {
    timer = setTimeout(()=>{
        tooltip.classList.remove('ls_activo');
    },1000)
})
java.addEventListener('mouseleave', ()=> {
    timer2 = setTimeout(()=>{
        tooltip2.classList.remove('ls_activo');
    },1000)
})

tooltip.addEventListener('mouseenter',()=> clearTimeout(timer))
tooltip.addEventListener('mouseleave',() => tooltip.classList.remove('ls_activo'));
tooltip2.addEventListener('mouseenter',()=> clearTimeout(timer2))
tooltip2.addEventListener('mouseleave',() => tooltip2.classList.remove('ls_activo'));