let Width = 1000;
let Height = 1000;
let R = 400;
let N = 2*3*5*7;
let dA = 2*Math.PI / N;;
let k = 1.0;
let NFrame = 1;

function setup() {
    createCanvas(Width, Height);
}

function draw() {
    background(0);
    stroke(255);
    fill(255);
    text('k: ' + k, 30, 30);
    translate(Width / 2, Height / 2);
    stroke(255, 100, 0);
    fill(255, 100, 0);
    fill(0);
    stroke(0);
    ellipse(0, 0, 2*R, 2*R);
    stroke(255, 100, 0);

    for(let n = 0; n < N; n++) {
	let a = n * dA;
	let x0 = R * Math.cos(a);
	let y0 = R * Math.sin(a);
	let x1 = R * Math.cos(k*a);
	let y1 = R * Math.sin(k*a);
	let color = 255/2 + 255*(mouseY - Height/2)/Height;
	stroke(color,255 - color,255 - color);
	line(x0, y0, x1, y1);
	//stroke(255,100,0);
	ellipse(x0, y0, 4, 4);
	//stroke(255,0,0);
	ellipse(x1, y1, 4, 4);

      }
    let sp = (mouseX - Width / 2) / Width;
    k += 2*sp / Math.sqrt((NFrame + 100));
    NFrame++;
}
