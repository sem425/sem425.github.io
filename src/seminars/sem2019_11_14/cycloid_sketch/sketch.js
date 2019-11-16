function setup() {
    createCanvas(1200, 480);
}

let T = 0.0; // время
let R = 20;  // радиус колеса
let V = 1;  // скорость центра колеса
let perimeter = 2 * Math.PI * R;

function draw() {
    let dist = T * V;             // пройденное расстояние
    let C = dist / perimeter;     // число оборотов
    let angle = 2 * Math.PI * C;  // угол поворота колеса в радианах
    let x_center = dist;          // X координата центра колеса
    let y_center = R;             // Y координата центра колеса
    let x = x_center + R * Math.cos(angle);   // x координата прилипшей резинки
    let y = y_center + R * Math.sin(angle);   // y координата прилипшей резинки

    ellipse(x, y + 50, 2, 2);
    T++;
    if (T > 1200) {
	background(255);
	T = 0;
    }
}
