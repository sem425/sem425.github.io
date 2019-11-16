function setup() {
    createCanvas(640, 480);
}

let T = 0.0;
let R_stationary = 100;
let R_moving = 10;
let speed = 10;

// Есть неподвижная окружность, а есть та, которая катится без проскальзования
// Надо для произвольного T найти угол между горизонталью и направлением на центр движужегося колеса

function draw() {
    let S = speed * T;         // пройденный линейный путь
    let A = S / R_stationary;  // угол между горизонталью и направленем на центр движужегося колеса
    let B = -S / R_moving;      // угол проворта движущегося колеса

    let x_center_moving = R_stationary * Math.cos(A); // центр подвижного колеса
    let y_center_moving = R_stationary * Math.sin(A); // центр подвижного колеса
    let x_moving = R_moving * Math.cos(B); // в системе подвижного колеса это координата жвачки
    let y_moving = R_moving * Math.sin(B); 
    let x = x_center_moving + x_moving; // координата точки
    let y = y_center_moving + y_moving; // координата точки
    ellipse(200 + x_center_moving + x_moving, 200 + y_center_moving + y_moving, R_moving * 2, R_moving * 2);
    ellipse(200 + x, 200 + y, 1, 1);
    T += 0.3;
}
