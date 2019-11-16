function setup() {
    createCanvas(640, 480);
}

let T = 0.0;
let R_stationary = 30;
let R_moving = 15;
let speed = 1;

// Есть неподвижная окружность, а есть та, которая катится без проскальзования
// Надо для произвольного T найти угол между горизонталью и направлением на центр движужегося колеса

let xs = [];
let ys = [];

let N = 0;


function draw() {
    let S = speed * T;         // пройденный линейный путь
    let A = S / R_stationary;  // угол между горизонталью и направленем на центр движужегося колеса
    let B = A + S / R_moving;      // угол проворта движущегося колеса

    let x_center_moving = (R_moving + R_stationary) * Math.cos(A); // центр подвижного колеса
    let y_center_moving = (R_moving + R_stationary) * Math.sin(A); // центр подвижного колеса
    let x_moving = R_moving * Math.cos(B); // в системе подвижного колеса это координата жвачки
    let y_moving = R_moving * Math.sin(B); 
    let x = x_center_moving + x_moving; // координата точки
    let y = y_center_moving + y_moving; // координата точки
    xs.push(x);
    ys.push(y);
    if (N > 2000) {
	xs.shift();
	ys.shift();
    }
    background(255);
    fill(255,255,255);
    stroke(0,0,0);
    ellipse(200, 200, R_stationary * 2, R_stationary * 2);
    //    fill(0,0,0);
    stroke(0,0,0);
    ellipse(200 + x_center_moving, 200 + y_center_moving, R_moving * 2, R_moving * 2);
    let NV = 12;
    for(let i = 0; i < NV; i++) {
	let x0 = x_center_moving + R_moving * Math.cos(B + i*2*Math.PI / NV);
	let y0 = y_center_moving + R_moving * Math.sin(B + i*2*Math.PI / NV);
	line(200 + x_center_moving, 200 + y_center_moving, 200 + x0, 200 + y0);
	
    }

    fill(255, 0, 0);
    ellipse(200 + x, 200 + y, 4, 4);

    fill(0,0,255);
    let mag = 255.0;
    for (let i = xs.length - 2; i >= 0; i--) {
	mag *= 0.999;
	stroke(255 - mag,255 - mag,255 - mag);
	line(200 + xs[i], 200 + ys[i], 200 + xs[i+1], 200 + ys[i+1]);
//	ellipse(200 + xs[i], 200 + ys[i], 1, 1);
    }
    T += 2;
    N += 1;
}
