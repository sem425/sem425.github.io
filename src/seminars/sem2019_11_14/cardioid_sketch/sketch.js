function setup() {
    createCanvas(300, 200);
}

let T = 0.0;
let R_stat = 30;
let R_mov  = 30;
let speed = 1;

let xs = [];
let ys = [];

let N = 0;

function draw() {
    let S = speed * T;         // пройденный линейный путь

    let A = S / R_stat;  // угол между горизонталью и направленем на центр движущегося колеса
    let x_center = (R_mov + R_stat) * Math.cos(A); // центр подвижного колеса
    let y_center = (R_mov + R_stat) * Math.sin(A); // центр подвижного колеса

    let B = A + S / R_mov;  // угол проворта движущегося колеса. Почему надо складывать углы???

    let X = x_center + R_mov * Math.cos(B);
    let Y = y_center + R_mov * Math.sin(B);

    background(255, 255, 255, 3);
    ellipse(100 + X, 80 + Y, 2, 2);
    T += 1;
}
