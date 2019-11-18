let Width = 380;
let Height = 380;
let R = 100;
let N = 100;
let dA = 2*Math.PI / N;
let k = 1.0;

function setup() {
    createCanvas(Width, Height);
}

function draw() {
    background(255);
    translate(Width / 2, Height / 2);
    stroke(255, 100, 0);
    fill(255, 100, 0);
    text(k, -30, -110);
    fill(255);
    stroke(0);
    ellipse(0, 0, 2*R, 2*R);
    stroke(255, 100, 0);
    for(let n = 0; n < N; n++) {
	  let a = n * dA;
	  let x0 = R * Math.cos(a);
	  let y0 = R * Math.sin(a);
	  let x1 = R * Math.cos(k*a);
	  let y1 = R * Math.sin(k*a);
	  line(x0, y0, x1, y1);
      }

    k *= 1.001;

}