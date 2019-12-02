let T = 0.0;
let Height = 400;
let Width = 600;
let HideMachine = false;
let X1 = -95;
let Y1 = 0;
let X2 = 95;
let Y2 = 0;
let R1 = 50;
let R2 = 50;
let L1 = 150;
let L2 = 150;
let Omega1 = 1.0;
let Omega2 = 3.0;


function setup() {
    createCanvas(Width, Height);
//    background(0);
}

function retP(x1, y1, r1, x2, y2, r2) {
    let dx = x1 - x2;
    let dy = y1 - y2;

    let Q = dx**2 + dy**2;
    let P = r1 + r2;
    let T = r1 - r2;
    let S = (-Q + P**2) * (Q - T**2);
    let K = Q + P * T;
    
    let sx1 = (-dx * K + dy * Math.sqrt(S)) / 2 / Q;
    let sy1 = -(dy * K + dx * Math.sqrt(S)) / 2 / Q;

    let sx2 = -(dx * K + dy * Math.sqrt(S)) / 2 / Q;
    let sy2 = (-dy * K + dx * Math.sqrt(S)) / 2 / Q;

    let ix1 = sx1 + x1;
    let iy1 = sy1 + y1;

    let ix2 = sx2 + x1;
    let iy2 = sy2 + y1;
    
    if (S >= 0) {
	return [ix1, iy1, ix2, iy2];
    } else {
	return null;
    }
}

function draw() {
    if(!HideMachine) {
	background(255);
	//stroke(0);
	fill(0,0,0,0);
	text("Press mouse", 10, 10);
    }

    if(mouseIsPressed) {
	HideMachine = !HideMachine;
    }
    
    translate(Width / 2, Height / 2);
    
    let x1 = X1 + R1*Math.cos(Omega1*T);
    let y1 = Y1 + R1*Math.sin(Omega1*T);
    let r1 = L1; 

    let x2 = X2 + R2*Math.cos(Omega2*T);
    let y2 = Y2 + R2*Math.sin(Omega2*T);
    let r2 = L2;

    if(!HideMachine) {
	line(X1, Y1, x1, y1);
	line(X2, Y2, x2, y2);
	ellipse(x1, y1, 2*r1, 2*r1);
	ellipse(x2, y2, 2*r2, 2*r2);
    }
    
    let v = retP(x1, y1, r1, x2, y2, r2);
    if(v != null) {
	let [ix1, iy1, ix2, iy2] = v;
	stroke(255, 0, 0);
	fill(255, 0, 0);
	ellipse(ix1, iy1, 5, 5);
	fill(0, 0, 255);
	stroke(0,0,255);
	ellipse(ix2, iy2, 5, 5);
	if(!HideMachine) {
	    line(x1, y1, ix1, iy1);
	    line(x2, y2, ix1, iy1);
	}
    }
    T += 0.02;
}
