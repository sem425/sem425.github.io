function setup() {
    createCanvas(640, 480);
}

let T = 0.0;
let R = 20;
let speed = 10;
let perimeter = Math.PI * 2 * R;

function draw() {
    let dist = T * speed;
    let C = dist / perimeter;
    let angle = 2 * Math.PI * C;
    let x_center = speed * T;
    let y_center = R;
    let x = x_center + R * Math.cos(angle);
    let y = 30 + y_center + R * Math.sin(angle);

    ellipse(x, y, 2, 2);
    T += 0.3;
}
