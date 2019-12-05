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

function draw_line(w){
    let [a,b] = w
    line(0, 1/b, 1/a, 0);
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
    stroke(0,0,0);
    draw_dataset();
    let w = eval_line(mouseX, mouseY);
    let [a, b] = eval_classifier_score(w);
    stroke(255,255,255);
    stroke(0,0,255);
    draw_line(w);

    fill(255,255,0);
    stroke(255,255,0);
    ellipse(500 + 150*a, Height - 150*b, 0.5, 0.5);

}


