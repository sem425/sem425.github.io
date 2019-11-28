let Width = 380;
let Height = 380;
let MaxVel = 10;
let T = 0.0;
let dT = 0.1;

let NPrey = 30;
let NPreyMax = 3000;
let Alpha = 0.005;
let Beta = 0.01;
let Delta = 0.2;
let Gamma = 0.005;
let Dist = 5;
let NPredator = 30;
let NPopulation = NPrey + NPredator;

let Xs = [];
let Ys = [];
let VYs = [];
let VXs = [];
// let TLive = [];
let Kinds = [];

function setup() {
    createCanvas(Width, Height);

    let kind = 0;
    for(let i = 0; i < NPopulation; i++) {
	if(i == NPrey) {
	    kind = 1;
	}

	let x = random(0, Width);
	let y = random(0, Height);
	let vx = random(-MaxVel, MaxVel);
	let vy = random(-MaxVel, MaxVel);

	Xs.push(x);
	Ys.push(y);
	VXs.push(vx);
	VYs.push(vy);
	Kinds.push(kind);
    }
}

function step(dT) {
    for(let i = 0; i < NPopulation; i++) {
	let newX = Xs[i] + VXs[i] * dT;
	let newY = Ys[i] + VYs[i] * dT;

	Xs[i] = (newX + Width) % Width;
	Ys[i] = (newY + Height) % Height;

	let coin = random();
	if (coin < Alpha && Kinds[i] == 0 && NPrey < NPreyMax) {
	    let x = Xs[i];
	    let y = Ys[i];
	    let vx = random(-MaxVel, MaxVel);
	    let vy = random(-MaxVel, MaxVel);

	    Xs.push(x);
	    Ys.push(y);
	    VXs.push(vx);
	    VYs.push(vy);
	    Kinds.push(0);

	    NPrey += 1;
	    NPopulation += 1;
	}

	if (coin < Gamma && Kinds[i] == 1) {
	    Kinds[i] = -1;
	    Xs[i] = 0;
	    Ys[i] = 0;
	    VXs[i] = 0;
	    VYs[i] = 0;

	    NPredator -= 1;
	}

    }

    for (let i = 0; i < NPopulation; i++) {
    	for (let j = 0; j < NPopulation; j++) {
    	    if (Kinds[i] == Kinds[j])
    		continue;

    	    if (Kinds[j] == 0 && Kinds[i] == 1 && abs(Xs[i] - Xs[j]) < Dist && abs(Ys[i] - Ys[j]) < Dist) {
    		Kinds[j] = -1;
    		Xs[j] = 0;
    		Ys[j] = 0;
    		VXs[j] = 0;
    		VYs[j] = 0;
    		NPrey -= 1;
		
    		if (random() >= Delta) {
    		    let vx = random(-MaxVel, MaxVel);
    		    let vy = random(-MaxVel, MaxVel);

    		    Xs[j] = Xs[i];
    		    Ys[j] = Ys[i];
    		    VXs[j] = vx;
    		    VYs[j] = vy;
    		    Kinds[j] = 1;
    		    NPredator += 1;
    		}
    	    }
    	}
    }

    let write_idx = 0;
    for (let read_idx = 0; read_idx < NPopulation; read_idx++) {
	if(Kinds[read_idx] != -1) {
	    Xs[write_idx] = Xs[read_idx];
	    Ys[write_idx] = Ys[read_idx];
	    VXs[write_idx] = VXs[read_idx];
	    VYs[write_idx] = VYs[read_idx];
	    Kinds[write_idx] = Kinds[read_idx];
	    
	    write_idx += 1
	}
    }
    
    NPopulation = NPrey + NPredator;
    for(let i = 0; i < Kinds.length - NPopulation; i++) {
	Xs.pop()
	Ys.pop()
	VXs.pop()
	VYs.pop()
	Kinds.pop()
    }
    
}

function draw() {
    background(255);
    fill(0);
    stroke(0);
    text('Prey: ' + NPrey + ' Predator: ' + NPredator, 10, 10);
    for(let i = 0; i < NPopulation; i++) {
	if (Kinds[i] == 1) {
	    fill(255, 0, 0);
	    stroke(255,0,0);
	    ellipse(Xs[i], Ys[i], 10, 10);
	} else {
	    fill(0, 255, 0);
	    stroke(0, 255, 0);
	    ellipse(Xs[i], Ys[i], 5, 5);
	}
    }

    step(dT);

}
