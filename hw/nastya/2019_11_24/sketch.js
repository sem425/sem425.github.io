function setup() {
  createCanvas(600, 600);
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
	return [null, null, null, null];
    }
}

function draw() {
    background(0);
    stroke(255);
    fill(0,0,0,0);

    let x1 = 300;
    let y1 = 300;
    let r1 = 100; 

    let x2 = mouseX;
    let y2 = mouseY;
    let r2 = 150;

    ellipse(x1, y1, 2*r1, 2*r1);
    ellipse(x2, y2, 2*r2, 2*r2);

    let [ix1, iy1, ix2, iy2] = retP(x1, y1, r1, x2, y2, r2);

    fill(255, 0, 0);
    ellipse(ix1, iy1, 10, 10);
    fill(0, 0, 255);
    ellipse(ix2, iy2, 10, 10);
}
