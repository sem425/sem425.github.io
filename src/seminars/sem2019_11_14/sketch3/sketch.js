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
let NTracePoints = 400; // Число точек в следе

function setup() {
    createCanvas(Width, Height);
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
    ellipse(X, Y, 5, 5);

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

    let mag = 255.0;
    for (let n = 0; n + 1 < NTracePoints; n++) {
	let th0 = (NTracePoints + traceHead - 1 - n) % NTracePoints;
	let th1 = (NTracePoints + th0 - 1) % NTracePoints;

	stroke(mag,255 - mag,255 - mag);
	line(traceX[th0], traceY[th0], traceX[th1], traceY[th1]);
	mag *= 0.995;
    }
    T += 1;
}
