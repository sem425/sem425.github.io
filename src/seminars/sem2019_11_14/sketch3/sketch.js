let Width = 380;
let Height = 380;
let T = 0.0;
let R_stat = 40;
let R_mov = 30;
let speed = 2;

// Есть неподвижная окружность, а есть та, которая катится без проскальзования
// Надо для произвольного T найти угол между горизонталью и направлением на центр движужегося колеса

let traceX = []; // X координаты точек следа
let traceY = []; // Y координаты точек следа
let traceHead = 0; // индекс головы следа
let NTracePoints = 370; // Число точек в следе
let mags = []; // яркости точек следа
let damping = 0.995;

function setup() {
    createCanvas(Width, Height);

    for (let n = 0, m = 255; n < NTracePoints; n++) {
	mags.push(m);
	m *= damping;
    }
    
    mags.reverse()
}

function draw() {
    let S = speed * T;         // пройденный линейный путь
    let A = S / R_stat;        // угол между горизонталью и направленем на центр движужегося колеса
    let B = A + S / R_mov;     // угол проворта движущегося колеса

    let x_center = (R_mov + R_stat) * Math.cos(A); // центр подвижного колеса
    let y_center = (R_mov + R_stat) * Math.sin(A); // центр подвижного колеса
    let X = x_center + R_mov * Math.cos(B);        // X положение метки
    let Y = y_center + R_mov * Math.sin(B);        // Y положение метки

    translate(Width / 2, Height / 2); // переносим центр координат
    // Задаем цвет фона
    background(255);
    
    // Рисуем неподвижное колесо
    fill(255,255,255);
    stroke(0,0,0);
    ellipse(0, 0, 2 * R_stat, 2 * R_stat);

    // Рисуем подвижное колесо
    ellipse(x_center, y_center, 2 * R_mov, 2 * R_mov);

    let NSpokes = 9;
    for (let n = 0; n < NSpokes; n++) {
	let a = B + 2 * Math.PI * n / NSpokes;
	let x = x_center + R_mov * Math.cos(a);
	let y = y_center + R_mov * Math.sin(a);
	line(x_center, y_center, x, y);
    }

    // Рисуем метку
    fill(255, 0, 0);
    stroke(255);
    ellipse(X, Y, 8, 8);

    // Рисуем след
    // добавляем точки следа, пока их не стало NTracePoints

    // [] -a- [a] -b- [ab] -c- [abc] -d- [abcd] -e- [ebcd] -f- [efcd] -g- [efgd] -h- [efgh]
    //          _        _         _      _           _           _           _       _
    //          1        2         3      0           1           2           3       0
    // [] -a- [a] -b- [ba] -c- [cba] -d- [dcba] -e- [edcb] -f- [fedc] -g- [gfed] -h- [hgfe]

    
    if (traceX.length < NTracePoints) {
	traceX.push(X);
	traceY.push(Y);
	traceHead++;
	traceHead %= NTracePoints;
    } else {
	traceX[traceHead] = X;
	traceY[traceHead] = Y;
	traceHead++;
	traceHead %= NTracePoints;
    }

    for (let n = 0; n + 1 < NTracePoints; n++) {
	let th0 = (traceHead + n) % NTracePoints;
	let th1 = (th0 + 1) % NTracePoints;
	
	stroke(mags[n], 255 - mags[n], 255 - mags[n]);
	line(traceX[th0], traceY[th0], traceX[th1], traceY[th1]);
    }
    T += 1;
}
