let Dataset = [];
let Json;
let Width = 800;
let Height = 600;

// http://static.turclubmai.ru/alex/current_seminar/sketch/

function preload() {
    let url = "http://static.turclubmai.ru/alex/current_seminar/sketch/dataset.json";
    Json = loadJSON(url);
    // Get the most recent earthquake in the database
}

function setup() {
    createCanvas(Width, Height);
    background(255,255,255);

    for (let i = 0; i < 1000; i++){
	Dataset.push([Json[i][0], Json[i][1], Json[i][2]]);
    }

    for(let row = 0; row < Dataset.length; row++) {
    	let [toss, x, y] = Dataset[row];
    	if (toss) {
    	    fill(255,0,0);
    	} else {
    	    fill(0,255,0);
    	}
    	ellipse(x+100, y+100, 5, 5);
    }
}

// https://p5js.org/reference/#/p5/loadJSON

function draw() {
    // let xs = [1,2,3];
    // text("P", 30, 10);
    // text(xs.length, 50, 50);
}


