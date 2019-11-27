let T = 0.0;
let Height = 800;
let Width = 800;

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
//    background(0);

    translate(Width / 2, Height / 2);
    scale(2);
    //rotate(0.04*T);
    
    let x1 = -95 + 50*Math.cos(5*T);
    let y1 = 50*Math.sin(5*T);
    let r1 = 120; 

    let x2 = 95 + 50*Math.cos(3.2*T);
    let y2 = 50*Math.sin(3.2*T);
    let r2 = 150;

    //background(255);
    stroke(0);
    fill(0,0,0,0);
    //line(-95, 0, x1, y1);
    //line(95, 0, x2, y2);
    //ellipse(x1, y1, 2*r1, 2*r1);
    //ellipse(x2, y2, 2*r2, 2*r2);
    
    
    let v = retP(x1, y1, r1, x2, y2, r2);
    if(v != null) {
	let [ix1, iy1, ix2, iy2] = v;
	stroke(255, 0, 0);
	fill(255, 0, 0);
	ellipse(ix1, iy1, 2, 2);
	fill(0, 0, 255);
	stroke(0,0,255);
	ellipse(ix2, iy2, 2, 2);
	//line(x1, y1, ix1, iy1);
	//line(x2, y2, ix1, iy1);
    }
    T += 0.02;
}
