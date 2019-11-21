// Функция setup вызывается один раз
// тут всякая настройка и возможна единовременная отрисовка

let Width = 1400;
let Height = 700;
let NVertex = 128;
let R = 100;
let T = 0.0; // время
let dT = 0.002;

// https://sem425.github.io/src/blog/2019_11_18/index.html

function setup() {
    createCanvas(Width, Height);
}

function lissajous(X, Y, A, B, T, i, omegaX, omegaY) {
    let angle = i * (2 * Math.PI) / NVertex + T;
    let x = X + A * R * Math.cos(omegaX * angle);
    let y = Y + B * R * Math.sin(omegaY * angle);
    return [x, y];
}

function draw() {
    // Берем один эллипс и второй чуть ниже первого
    // Оба эллипса вращаются в прот. стороны
    background(0);
    stroke(255);
    fill(255);

    let omegaX = 10 * (mouseX - Width / 2) / (Width / 2);
    let omegaY = 10 * (mouseY - Height / 2) / (Height / 2);
    text(omegaX, 30, 30);
    text(omegaY, 30, 45);
    
    for (let i = 0; i < NVertex; i++) {
	let [x0, y0] = lissajous(Width / 2, 0.2*Height, 2, 0.5, T, i, omegaX, omegaY);
	let [x1, y1] = lissajous(Width / 2, 0.8*Height, 2, 0.5, -T, i, omegaX, omegaY);
	line(x0, y0, x1, y1);
    }
    T += dT;
    //    T += (mouseX - 300) / 10000;
}




// <2019-11-20 Wed 21:12>
// function draw() {
//     background(0);
//     fill(255);
//     stroke(255);
//     let omegaX = 10 * (mouseX - 300) / 300;
//     let omegaY = 10 * (mouseY - 300) / 300;
//     text('omegaX: ' + omegaX, 30, 30);
//     text('omegaY: ' + omegaY, 30, 40);
//     for(let i = 0; i < NVertex; i++) {
// 	// в этом цикле angle обходит вершинки правильного NVertex многоугольника
// 	let angle = T + i * 2 * Math.PI / NVertex;
// 	let x = 300 + R * Math.cos(omegaX * angle);
// 	let y = 300 + R * Math.sin(omegaY * angle);
// 	ellipse(x, y, 2, 2)
//     }
//     T += 0.03;
// }


//<2019-11-20 Wed 21:00>
// function my_ellipse(X, Y, A, B, T, i) {
//     let angle = i * (2 * Math.PI) / NVertex + T;
//     let x = X + A * R * Math.cos(angle);
//     let y = Y + B * R * Math.sin(angle);
//     return [x, y];
// }

// function draw() {
//     // Берем один эллипс и второй чуть ниже первого
//     // Оба эллипса вращаются в прот. стороны
//     background(0);
//     stroke(255);
//     fill(255);

//     for (let i = 0; i < NVertex; i++) {
// 	let [x0, y0] = my_ellipse(300, 200, 2, 0.5, T, i);
// 	let [x1, y1] = my_ellipse(300, 400, 2, 0.5, -T, i);
// 	line(x0, y0, x1, y1);
//     }
//     T += (mouseX - 300) / 10000;
// }



// <2019-11-20 Wed 20:50>
// function ellipse1(i) {
//     let angle = i * (2 * Math.PI) / NVertex + T;
//     let x = 300 + 2 * R * Math.cos(angle);
//     let y = 200 + 0.5 * R * Math.sin(angle);
//     return [x, y];
// }

// function ellipse2(i) {
//     let angle = i * (2 * Math.PI) / NVertex - T;
//     let x = 300 + 2 * R * Math.cos(angle);
//     let y = 400 + 0.5 * R * Math.sin(angle);
//     return [x, y];
// }




// <2019-11-20 Wed 20:26>
// function eval_vertex(i) {
//     let angle = T + 2 * Math.PI / NVertex * i;
//     let x = 300 + 2 * R*Math.cos(angle);
//     let y = 300 + R*Math.sin(angle);
//     return [x, y];
// }

// function draw() {
//     background(255);
//     for(let i = 0; i < NVertex; i++){
// 	let [x, y] = eval_vertex(i);
// 	let [x1, y1] = eval_vertex(i + 1);
// 	ellipse(x, y, 2, 2);
// 	line(x, y, x1, y1);
//     }
//     T += 0.03;
// }





// Эта функция вызывается около 25-60раз в секунду
// mouseX
// mouseY
// function draw() {
//     background(255);
//     fill(0);
//     ellipse(mouseX, mouseY, mouseY, mouseY);
// }

