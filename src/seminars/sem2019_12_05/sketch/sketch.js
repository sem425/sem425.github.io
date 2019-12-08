let Dataset = [];
let Json;
let Width = 800;
let Height = 600;
let Lines = [];

// http://static.turclubmai.ru/alex/current_seminar/sketch/

function preload() {
    let url = "dataset.json";
    Json = loadJSON(url);
    // Get the most recent earthquake in the database
}

function draw_dataset() {
    for(let row = 0; row < Dataset.length; row++) {
    	let [toss, x, y] = Dataset[row];
    	if (toss) {
    	    fill(255,0,0);
    	} else {
    	    fill(0,255,0);
    	}
    	ellipse(x, y, 3, 3);
    }
}

function eval_line(x, y) {
    let r2 = x**2 + y**2;
    return [x / r2, y / r2];
}

function eval_line1(p1, p2) {
    let [x0, y0] = p1;
    let [x1, y1] = p2;

    // a*x0 + b*y0 = 1
    // a*x1 + b*y1 = 1

    // a*(x1 - x0) + b*(y1 - y0) = 0
    // a*x0 + b*y0 = 1

    // a = k/(x1 - x0)
    // b = k/(y0 - y1)

    // k/(x1 - x0) * x0 + k/(y0 - y1) * y0 = 1
    // k*[x0/(x1 - x0) + y0*(y0 - y1)] = 1
    // k = 1 / [x0/(x1 - x0) + y0*(y0 - y1)] = (x1-x0)*(y0-y1) / [x0*(y0 - y1) + y0*(x1 - x0)]

    // a = (y0-y1) / [x0*(y0 - y1) + y0*(x1 - x0)]
    // b = (x1-x0) / [x0*(y0 - y1) + y0*(x1 - x0)]

    let d = x0*(y0 - y1) + y0*(x1 - x0);
    let a = (y0 - y1) / d;
    let b = (x1 - x0) / d;
    return [a, b];
}

function draw_line(w){
    let [a,b] = w
    if (b < 0 && a > 0) {
	// x*a + Height*b = 1
	// x = (1 - Height*b) / a
	line((1 - Height*b) / a, Height, 1/a, 0);
    }

    if (b > 0 && a < 0) {
	// Width*a + b*y = 1
	// y = (1 - Width*a) / b
	line(0, 1/b, Width, (1 - Width*a) / b);
    }
    if (a > 0 && b > 0) {
	line(0, 1/b, 1/a, 0);

    }
}

function setup() {
    createCanvas(Width, Height);
    background(0,0,0);

    for (let i = 0; i < 2000; i++){
	Dataset.push([Json[i][0], Json[i][1] + 100, Json[i][2] + 100]);
    }
}

function eval_classifier_score(w) {
    let positive = 0.0;
    let p1 = 0.0;
    let p2 = 0.0;
    for(let i = 0; i < Dataset.length; i++) {
	let [toss, x, y] = Dataset[i];
	let v = w[0] * x + w[1] * y - 1 <= 0;
	if (toss) {
	    positive++;
	    if (v) {
		p1++;
	    }
	} else {
	    if (v) {
		p2++;
	    }
	}
    }

    let a = p1 / positive;
    let b = p2 / (Dataset.length - positive);
    if (a >= b) {
	return [b, a];
    } else {
	return [1.0 - b, 1.0 - a];
    }
}

// https://p5js.org/reference/#/p5/loadJSON

function draw() {
//    background(0,0,0);
    stroke(0,0,0);
    let rcoord = () => {
	return [random(0, Width), random(0, Height)];
    };
    let w = eval_line1(rcoord(), rcoord());
    fill(255,255,255);
    stroke(255,255,255);
    //let w = eval_line(random(0, Width), random(0, Height));
    let [a, b] = eval_classifier_score(w);
    stroke(255,255,255);
    stroke(0,0,255);
    draw_line(w);

    fill(255,255,0);
    stroke(255,255,0);
    ellipse(500 + 150*a, Height - 150*b, 2, 2);
    stroke(0,0,0);
    draw_dataset();
}


